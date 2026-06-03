"use client";

import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type SortingState,
  type RowSelectionState,
} from "@tanstack/react-table";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getCategoryColumns } from "./category-columns";
import { useCategories } from "./category-provider";
import type { Category } from "./category-data";

interface CategoryTableProps {
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onDuplicate: (category: Category) => void;
  onBulkAction: (action: string, ids: string[]) => void;
}

export function CategoryTable({
  onEdit,
  onDelete,
  onDuplicate,
  onBulkAction,
}: CategoryTableProps) {
  const { categories, reorder } = useCategories();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const columns = useMemo(
    () => getCategoryColumns({ onEdit, onDelete, onDuplicate }),
    [onEdit, onDelete, onDuplicate]
  );

  const tableData = useMemo(() => {
    const parents = categories
      .filter((c) => c.parentId === null)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    const result: Category[] = [];
    for (const parent of parents) {
      result.push(parent);
      if (expandedIds.has(parent.id)) {
        const children = categories
          .filter((c) => c.parentId === parent.id)
          .sort((a, b) => a.sortOrder - b.sortOrder);
        result.push(...children);
      }
    }
    return result;
  }, [categories, expandedIds]);

  const table = useReactTable({
    data: tableData,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeRow = table.getRow(String(active.id));
    const overRow = table.getRow(String(over.id));
    if (!activeRow || !overRow) return;

    const activeCategory = activeRow.original;
    const overCategory = overRow.original;

    if (activeCategory.parentId !== overCategory.parentId) return;

    const oldIndex = tableData.findIndex((c) => c.id === active.id);
    const newIndex = tableData.findIndex((c) => c.id === over.id);

    const newData = arrayMove(tableData, oldIndex, newIndex);
    const orderedIds = newData.map((c) => c.id);
    reorder(orderedIds);
  };

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectedRowIds = Object.keys(rowSelection).filter(
    (id) => rowSelection[id]
  );

  return (
    <div>
      {selectedRowIds.length > 0 && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {selectedRowIds.length} selected
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBulkAction("activate", selectedRowIds)}
          >
            Activate
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBulkAction("deactivate", selectedRowIds)}
          >
            Deactivate
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onBulkAction("delete", selectedRowIds)}
          >
            Delete
          </Button>
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              <SortableContext
                items={tableData.map((c) => c.id)}
                strategy={verticalListSortingStrategy}
              >
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={row.original.parentId ? "bg-muted/50" : ""}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {cell.column.id === "name" ? (
                          <div className="flex items-center gap-2">
                            {tableData.some(
                              (c) => c.parentId === row.original.id
                            ) && (
                              <button
                                onClick={() => toggleExpand(row.original.id)}
                                className="text-xs"
                              >
                                {expandedIds.has(row.original.id)
                                  ? "\u25BC"
                                  : "\u25B6"}
                              </button>
                            )}
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </div>
                        ) : cell.column.id === "drag" ? (
                          <GripVertical className="h-4 w-4 cursor-grab text-muted-foreground" />
                        ) : (
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </SortableContext>
              {table.getRowModel().rows.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No categories found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </DndContext>
    </div>
  );
}
