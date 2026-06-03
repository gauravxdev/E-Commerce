"use client"

import React, { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Save, ArrowUp, ArrowDown, Eye, EyeOff } from "lucide-react"
import { useSiteSettings, SectionConfig } from "@/components/site-settings-provider"

export default function SettingsPage() {
  const { siteName, primaryColor, baseFontSize, sections, updateSettings, updateSection } = useSiteSettings();
  
  const [localSiteName, setLocalSiteName] = useState(siteName);
  const [localPrimaryColor, setLocalPrimaryColor] = useState(primaryColor);
  const [localBaseFontSize, setLocalBaseFontSize] = useState(baseFontSize);
  
  // Sort sections for the builder UI
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  const handleSaveGlobal = () => {
    updateSettings({
      siteName: localSiteName,
      primaryColor: localPrimaryColor,
      baseFontSize: localBaseFontSize
    });
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      const current = sortedSections[index];
      const previous = sortedSections[index - 1];
      updateSection(current.id, { order: previous.order });
      updateSection(previous.id, { order: current.order });
    } else if (direction === 'down' && index < sortedSections.length - 1) {
      const current = sortedSections[index];
      const next = sortedSections[index + 1];
      updateSection(current.id, { order: next.order });
      updateSection(next.id, { order: current.order });
    }
  };

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
            
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Site Settings</h1>
                <p className="text-muted-foreground mt-1">Manage global appearance and homepage structure dynamically.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Global Settings */}
              <div className="flex flex-col gap-6 lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Global Appearance</CardTitle>
                    <CardDescription>Changes reflect instantly across the site.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="siteName">Site Name / Title</Label>
                      <Input 
                        id="siteName" 
                        value={localSiteName} 
                        onChange={(e) => setLocalSiteName(e.target.value)} 
                      />
                    </div>
                    
                    <div className="grid gap-3">
                      <Label htmlFor="primaryColor">Primary Brand Color</Label>
                      <div className="flex gap-3 items-center">
                        <Input 
                          id="primaryColor" 
                          type="color" 
                          className="w-16 h-10 p-1 cursor-pointer"
                          value={localPrimaryColor} 
                          onChange={(e) => setLocalPrimaryColor(e.target.value)} 
                        />
                        <Input 
                          value={localPrimaryColor} 
                          onChange={(e) => setLocalPrimaryColor(e.target.value)} 
                          className="flex-1 font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="baseFontSize">Base Font Size</Label>
                      <Select value={localBaseFontSize} onValueChange={setLocalBaseFontSize}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="14px">Small (14px)</SelectItem>
                          <SelectItem value="16px">Medium (16px)</SelectItem>
                          <SelectItem value="18px">Large (18px)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button onClick={handleSaveGlobal} className="w-full gap-2 mt-2">
                      <Save className="w-4 h-4" /> Save Appearance
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Homepage Builder */}
              <div className="flex flex-col gap-6 lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Homepage Builder</CardTitle>
                    <CardDescription>Reorder, toggle visibility, and customize text for each homepage section.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    {sortedSections.map((sec, index) => (
                      <div key={sec.id} className={`border rounded-xl p-4 transition-colors ${sec.visible ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-100 opacity-70'}`}>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="flex flex-col">
                              <button disabled={index === 0} onClick={() => moveSection(index, 'up')} className="text-gray-400 hover:text-gray-900 disabled:opacity-30">
                                <ArrowUp className="w-4 h-4" />
                              </button>
                              <button disabled={index === sortedSections.length - 1} onClick={() => moveSection(index, 'down')} className="text-gray-400 hover:text-gray-900 disabled:opacity-30">
                                <ArrowDown className="w-4 h-4" />
                              </button>
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900">{sec.name}</h3>
                              <p className="text-xs text-gray-500 font-mono">{sec.id}</p>
                            </div>
                          </div>
                          
                          <Button 
                            variant={sec.visible ? "default" : "outline"} 
                            size="sm" 
                            className="gap-2"
                            onClick={() => updateSection(sec.id, { visible: !sec.visible })}
                          >
                            {sec.visible ? <><Eye className="w-4 h-4" /> Visible</> : <><EyeOff className="w-4 h-4" /> Hidden</>}
                          </Button>
                        </div>

                        {/* Edit Content Form */}
                        {sec.visible && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                            {sec.title !== undefined && (
                              <div className="grid gap-2 md:col-span-2">
                                <Label className="text-xs text-gray-500">Title</Label>
                                <Input 
                                  value={sec.title} 
                                  onChange={(e) => updateSection(sec.id, { title: e.target.value })} 
                                />
                              </div>
                            )}
                            {sec.subtitle !== undefined && (
                              <div className="grid gap-2 md:col-span-2">
                                <Label className="text-xs text-gray-500">Subtitle / Description</Label>
                                <Input 
                                  value={sec.subtitle} 
                                  onChange={(e) => updateSection(sec.id, { subtitle: e.target.value })} 
                                />
                              </div>
                            )}
                            {sec.bgColor !== undefined && (
                              <div className="grid gap-2">
                                <Label className="text-xs text-gray-500">Background Color (Tailwind Class)</Label>
                                <Input 
                                  value={sec.bgColor} 
                                  onChange={(e) => updateSection(sec.id, { bgColor: e.target.value })} 
                                  placeholder="e.g. bg-white"
                                />
                              </div>
                            )}
                            {sec.textColor !== undefined && (
                              <div className="grid gap-2">
                                <Label className="text-xs text-gray-500">Text Color (Tailwind Class)</Label>
                                <Input 
                                  value={sec.textColor} 
                                  onChange={(e) => updateSection(sec.id, { textColor: e.target.value })} 
                                  placeholder="e.g. text-gray-900"
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
