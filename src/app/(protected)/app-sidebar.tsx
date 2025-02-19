'use client'
import { Bot, Calendar, Home, Inbox, Plus, Presentation, Search, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu,CreditCard,QuoteIcon,LayoutDashboard } from "lucide-react"
import Image from "next/image"
import { Sidebar,
    SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar"
import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import useProject from "~/hooks/use-project"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Q&A",
    url: "/qa",
    icon: Bot,
  },
  {
    title: "Meeting",
    url: "/dashboard/calender",
    icon: Presentation,
  },
  {
    title: "Billing",
    url: "/dashboard/search",
    icon: CreditCard,
  },
 
]


export function AppSidebar() {
  const {open,setOpen}=useSidebar()
  const {projects,projectId,setProjectId}=useProject()
  
  console.log(open);
  
  const pathname =usePathname()
  return (
    <Sidebar className="h-screen shadow " collapsible="none"  variant="sidebar">
      <SidebarHeader>
        
        <Link className="cursor-pointer" href={'/'}>
        <Image  alt="LOGO" src={'/logo.png'} height={50} width={100}/>
        </Link>
        
        
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link className={cn({'bg-primary text-white':pathname==item.url})} href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>

        <SidebarGroupLabel>Your Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects?.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <div className="cursor-pointer" onClick={()=>setProjectId(item.id)} >
                      
                      

                      <p className={ `${projectId==item.id&&'text-white bg-primary '} p-2  rounded-md py-1 border`}>P</p>
                      
                      
                      <span>{item.name}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                

                  <Link href={'/create'}>
                <Button className="text-foreground bg-background"  size={"sm"}  variant={"outline"}>
                  <Plus/>
                  Create Project
                </Button>
                </Link>
                
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
              </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
