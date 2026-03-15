"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Search,
  FolderOpen,
  FileText,
  FileSpreadsheet,
  FileImage,
  MoreVertical,
  Download,
  Share2,
  Trash2,
  Star,
  Clock,
  Grid3X3,
  List,
  Upload,
  Plus,
  Filter,
  ChevronRight,
  Folder
} from "lucide-react"

type FileItem = {
  id: number
  name: string
  type: "folder" | "document" | "spreadsheet" | "image" | "pdf"
  size?: string
  modified: string
  shared: boolean
  starred: boolean
  category: string
}

const files: FileItem[] = [
  { id: 1, name: "2024 Trend Reports", type: "folder", modified: "Mar 14, 2024", shared: true, starred: true, category: "Reports" },
  { id: 2, name: "Consumer Insights Q1", type: "folder", modified: "Mar 12, 2024", shared: false, starred: false, category: "Insights" },
  { id: 3, name: "Ingredient Analysis - Collagen", type: "document", size: "2.4 MB", modified: "Mar 15, 2024", shared: true, starred: true, category: "Analysis" },
  { id: 4, name: "Market Share Analysis.xlsx", type: "spreadsheet", size: "1.8 MB", modified: "Mar 13, 2024", shared: true, starred: false, category: "Analysis" },
  { id: 5, name: "Product Launch Presentation", type: "document", size: "5.2 MB", modified: "Mar 10, 2024", shared: false, starred: false, category: "Presentations" },
  { id: 6, name: "Competitor Landscape Q1.pdf", type: "pdf", size: "3.1 MB", modified: "Mar 8, 2024", shared: true, starred: true, category: "Reports" },
  { id: 7, name: "Survey Results - Wellness", type: "spreadsheet", size: "890 KB", modified: "Mar 5, 2024", shared: false, starred: false, category: "Surveys" },
  { id: 8, name: "Brand Assets", type: "folder", modified: "Feb 28, 2024", shared: true, starred: false, category: "Assets" },
  { id: 9, name: "Campaign Performance.xlsx", type: "spreadsheet", size: "1.2 MB", modified: "Feb 25, 2024", shared: false, starred: false, category: "Reports" },
  { id: 10, name: "Consumer Journey Map", type: "image", size: "4.5 MB", modified: "Feb 20, 2024", shared: true, starred: true, category: "Strategy" },
]

const recentFiles = files.filter(f => f.type !== "folder").slice(0, 5)
const starredFiles = files.filter(f => f.starred)

export function DriveContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPath, setCurrentPath] = useState(["My Drive"])

  const filteredFiles = files.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getFileIcon = (type: string) => {
    switch (type) {
      case "folder": return <FolderOpen className="h-5 w-5 text-amber-500" />
      case "document": return <FileText className="h-5 w-5 text-blue-500" />
      case "spreadsheet": return <FileSpreadsheet className="h-5 w-5 text-green-500" />
      case "image": return <FileImage className="h-5 w-5 text-purple-500" />
      case "pdf": return <FileText className="h-5 w-5 text-red-500" />
      default: return <FileText className="h-5 w-5 text-muted-foreground" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Drive</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Store, share, and collaborate on files and reports
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            New
          </Button>
        </div>
      </div>

      {/* Search and View Toggle */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files and folders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
        <div className="flex border rounded-lg">
          <Button 
            variant={viewMode === "grid" ? "secondary" : "ghost"} 
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button 
            variant={viewMode === "list" ? "secondary" : "ghost"} 
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        {currentPath.map((path, index) => (
          <div key={index} className="flex items-center gap-1">
            {index > 0 && <ChevronRight className="h-4 w-4" />}
            <button className="hover:text-foreground transition-colors">
              {path}
            </button>
          </div>
        ))}
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Files</TabsTrigger>
          <TabsTrigger value="recent">
            <Clock className="h-4 w-4 mr-1" />
            Recent
          </TabsTrigger>
          <TabsTrigger value="starred">
            <Star className="h-4 w-4 mr-1" />
            Starred
          </TabsTrigger>
          <TabsTrigger value="shared">
            <Share2 className="h-4 w-4 mr-1" />
            Shared
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredFiles.map((file) => (
                <Card 
                  key={file.id} 
                  className="cursor-pointer hover:border-primary/50 transition-colors group"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-3 rounded-lg ${
                        file.type === "folder" ? "bg-amber-50" : "bg-muted"
                      }`}>
                        {file.type === "folder" ? (
                          <Folder className="h-8 w-8 text-amber-500" />
                        ) : (
                          getFileIcon(file.type)
                        )}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Star className="h-4 w-4 mr-2" />
                            {file.starred ? "Unstar" : "Star"}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {file.size && <span>{file.size}</span>}
                        <span>{file.modified}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      {file.starred && <Star className="h-3 w-3 fill-amber-400 text-amber-400" />}
                      {file.shared && <Share2 className="h-3 w-3 text-primary" />}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {filteredFiles.map((file) => (
                    <div 
                      key={file.id} 
                      className="flex items-center gap-4 p-4 hover:bg-muted/50 cursor-pointer group"
                    >
                      <div className={`p-2 rounded-lg ${
                        file.type === "folder" ? "bg-amber-50" : "bg-muted"
                      }`}>
                        {getFileIcon(file.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{file.category}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {file.starred && <Star className="h-4 w-4 fill-amber-400 text-amber-400" />}
                        {file.shared && <Badge variant="outline" className="text-xs">Shared</Badge>}
                      </div>
                      <div className="text-sm text-muted-foreground w-24 text-right">
                        {file.size || "--"}
                      </div>
                      <div className="text-sm text-muted-foreground w-28 text-right">
                        {file.modified}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recently Modified</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {recentFiles.map((file) => (
                  <div 
                    key={file.id} 
                    className="flex items-center gap-4 p-4 hover:bg-muted/50 cursor-pointer"
                  >
                    <div className="p-2 rounded-lg bg-muted">
                      {getFileIcon(file.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{file.modified}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {file.size}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="starred">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Starred Files</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {starredFiles.map((file) => (
                  <div 
                    key={file.id} 
                    className="flex items-center gap-4 p-4 hover:bg-muted/50 cursor-pointer"
                  >
                    <div className={`p-2 rounded-lg ${
                      file.type === "folder" ? "bg-amber-50" : "bg-muted"
                    }`}>
                      {getFileIcon(file.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{file.category}</p>
                    </div>
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <div className="text-sm text-muted-foreground">
                      {file.modified}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shared">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Shared with Me</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {files.filter(f => f.shared).map((file) => (
                  <div 
                    key={file.id} 
                    className="flex items-center gap-4 p-4 hover:bg-muted/50 cursor-pointer"
                  >
                    <div className={`p-2 rounded-lg ${
                      file.type === "folder" ? "bg-amber-50" : "bg-muted"
                    }`}>
                      {getFileIcon(file.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{file.modified}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">Shared</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Storage Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Storage Used</span>
            <span className="text-sm text-muted-foreground">12.4 GB of 100 GB</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: "12.4%" }} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
