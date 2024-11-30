import { Search, Plus } from 'lucide-react'
import { Button } from "./ui/button"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"

export function Navigation() {
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold">Explorar</h2>
        <div className="flex-1 flex justify-end gap-2">
          <Button size="icon" variant="ghost">
            <Search className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="ghost">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="albums" className="w-full">
        <TabsList className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <TabsTrigger value="reviews" className="flex-1">
            Resenhas
          </TabsTrigger>
          <TabsTrigger value="albums" className="flex-1">
            Albums
          </TabsTrigger>
          <TabsTrigger value="singles" className="flex-1">
            Singles
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

