"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SiteShell } from "@/components/site/SiteShell";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import { products, allColors, allSizes, type Category } from "@/lib/mock-data";

const CATEGORIES: Category[] = ["Women", "Men", "Kids", "Accessories"];
const SORTS = [
  { value: "latest", label: "Latest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "featured", label: "Featured" },
];

export function ProductsListing({
  initialCategory,
  initialSale,
}: {
  initialCategory?: string;
  initialSale?: boolean;
}) {
  const router = useRouter();
  const initialCat =
    initialCategory && CATEGORIES.includes(initialCategory as Category)
      ? [initialCategory as Category]
      : [];

  const [cats, setCats] = useState<Category[]>(initialCat);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colorNames, setColorNames] = useState<string[]>([]);
  const [price, setPrice] = useState<[number, number]>([0, 10000]);
  const [saleOnly, setSaleOnly] = useState(Boolean(initialSale));
  const [sort, setSort] = useState("latest");

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (cats.length && !cats.includes(p.category)) return false;
      if (sizes.length && !p.sizes.some((s) => sizes.includes(s))) return false;
      if (colorNames.length && !p.colors.some((c) => colorNames.includes(c.name))) return false;
      const ep = p.salePrice ?? p.price;
      if (ep < price[0] || ep > price[1]) return false;
      if (saleOnly && p.salePrice == null) return false;
      return true;
    });
    switch (sort) {
      case "price-asc": list.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price)); break;
      case "price-desc": list.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price)); break;
      case "featured": list.sort((a, b) => Number(!!b.isFeatured) - Number(!!a.isFeatured)); break;
      default: list.sort((a, b) => b.createdAt - a.createdAt);
    }
    return list;
  }, [cats, sizes, colorNames, price, saleOnly, sort]);

  const toggle = <T,>(list: T[], v: T, set: (l: T[]) => void) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const resetFilters = () => {
    setCats([]); setSizes([]); setColorNames([]); setPrice([0, 10000]); setSaleOnly(false);
    router.push("/products");
  };

  const FilterPanel = (
    <div className="space-y-6">
      <FilterGroup title="Category">
        <div className="space-y-2">
          {CATEGORIES.map((c) => (
            <label key={c} className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox checked={cats.includes(c)} onCheckedChange={() => toggle(cats, c, setCats)} />
              {c}
            </label>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Size">
        <ToggleGroup type="multiple" value={sizes} onValueChange={setSizes} className="flex flex-wrap justify-start gap-1">
          {allSizes.slice(0, 14).map((s) => (
            <ToggleGroupItem key={s} value={s} className="h-9 min-w-9 border border-border px-2 text-xs data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
              {s}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </FilterGroup>
      <FilterGroup title="Color">
        <div className="flex flex-wrap gap-2">
          {allColors.map((c) => {
            const active = colorNames.includes(c.name);
            return (
              <button
                key={c.name}
                onClick={() => toggle(colorNames, c.name, setColorNames)}
                aria-label={c.name}
                title={c.name}
                className={`h-7 w-7 rounded-full border-2 transition ${active ? "border-primary ring-2 ring-primary/30" : "border-border"}`}
                style={{ backgroundColor: c.hex }}
              />
            );
          })}
        </div>
      </FilterGroup>
      <FilterGroup title={`Price: Rs. ${price[0].toLocaleString()} – Rs. ${price[1].toLocaleString()}`}>
        <Slider min={0} max={10000} step={100} value={price} onValueChange={(v) => setPrice([v[0], v[1]] as [number, number])} />
      </FilterGroup>
      <FilterGroup title="On Sale">
        <div className="flex items-center gap-2">
          <Switch checked={saleOnly} onCheckedChange={setSaleOnly} id="sale" />
          <Label htmlFor="sale" className="text-sm">Show sale only</Label>
        </div>
      </FilterGroup>
      <Button variant="outline" className="w-full" onClick={resetFilters}>Clear All Filters</Button>
    </div>
  );

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Shop All</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Showing {filtered.length} of {products.length} products
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden gap-2">
                  <SlidersHorizontal className="h-4 w-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[85vh] overflow-y-auto">
                <SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader>
                <div className="mt-4">{FilterPanel}</div>
              </SheetContent>
            </Sheet>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
              <SelectContent>
                {SORTS.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">{FilterPanel}</aside>
          <div>
            {filtered.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border p-16 text-center">
                <p className="text-muted-foreground">No products match your filters.</p>
                <Button variant="outline" className="mt-4" onClick={resetFilters}>Clear filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 xl:grid-cols-4">
                {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</h3>
      {children}
    </div>
  );
}
