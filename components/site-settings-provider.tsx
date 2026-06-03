"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

export type SectionConfig = {
  id: string;
  name: string;
  visible: boolean;
  order: number;
  title?: string;
  subtitle?: string;
  bgColor?: string;
  textColor?: string;
  buttonText?: string;
};

export const defaultSections: SectionConfig[] = [
  { id: "HeroSection", name: "Hero Section", visible: true, order: 1 },
  { id: "PopularProductsSection", name: "Popular Products", visible: true, order: 2 },
  { id: "OurProductsSection", name: "Featured Gadgets", visible: true, order: 3 },
  { id: "ApexOpticalSection", name: "Apex Optical Highlight", visible: true, order: 4 },
  { id: "FeaturesGridSection", name: "Features Grid", visible: true, order: 5 },
  { id: "AutomatedLivingSection", name: "Automated Living", visible: true, order: 6 },
  { id: "SmartBluetoothSection", name: "Smart Bluetooth", visible: true, order: 7 },
];

type SiteSettings = {
  version: number;
  siteName: string;
  primaryColor: string; // e.g. hex
  baseFontSize: string; // e.g. 16px
  sections: SectionConfig[];
  updateSettings: (newSettings: Partial<Omit<SiteSettings, 'updateSettings' | 'updateSection'>>) => void;
  updateSection: (id: string, updates: Partial<SectionConfig>) => void;
};

const defaultSettings: Omit<SiteSettings, 'updateSettings' | 'updateSection'> = {
  version: 2,
  siteName: "Snopex",
  primaryColor: "#d9f95f", // brand-accent
  baseFontSize: "16px",
  sections: defaultSections,
};

const SiteSettingsContext = createContext<SiteSettings | undefined>(undefined);

export function SiteSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("snopex_admin_settings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.version === 2) {
          setSettings(parsed);
        } else {
          // Version mismatch: reset to clear bad defaults from previous version
          setSettings(defaultSettings);
        }
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("snopex_admin_settings", JSON.stringify(settings));
      
      // Inject dynamic CSS variables to root
      document.documentElement.style.setProperty("--color-brand-accent", settings.primaryColor);
      document.documentElement.style.fontSize = settings.baseFontSize;
      document.title = settings.siteName;
    }
  }, [settings, mounted]);

  const updateSettings = (newSettings: Partial<Omit<SiteSettings, 'updateSettings'>>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const updateSection = (id: string, updates: Partial<SectionConfig>) => {
    setSettings((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) => (sec.id === id ? { ...sec, ...updates } : sec)),
    }));
  };

  return (
    <SiteSettingsContext.Provider value={{ ...settings, updateSettings, updateSection }}>
      {/* Dynamic CSS injection for fallback styling if tailwind doesn't pick up CSS var instantly */}
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --color-brand-accent: ${settings.primaryColor};
        }
      `}} />
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext);
  if (!context) throw new Error("useSiteSettings must be used within SiteSettingsProvider");
  return context;
}
