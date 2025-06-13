// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Users } from "lucide-react"

// // Mock data for the archive
// const archivedRequestsData = [
//   {
//     id: "REQ-2023-001",
//     clientName: "John Smith",
//     type: "Individual",
//     status: "Validated",
//     date: "2023-05-15",
//     completedDate: "2023-05-20",
//     completedBy: "Sarah Johnson",
//   },
//   {
//     id: "REQ-2023-002",
//     clientName: "Acme Corp",
//     type: "Corporate",
//     status: "Rejected",
//     date: "2023-05-10",
//     completedDate: "2023-05-18",
//     completedBy: "Michael Brown",
//   },
//   {
//     id: "REQ-2023-003",
//     clientName: "Sarah Johnson",
//     type: "Individual",
//     status: "Validated",
//     date: "2023-05-05",
//     completedDate: "2023-05-12",
//     completedBy: "David Wilson",
//   },
//   {
//     id: "REQ-2023-004",
//     clientName: "Tech Startups LLC",
//     type: "Entrepreneur",
//     status: "Rejected",
//     date: "2023-04-28",
//     completedDate: "2023-05-08",
//     completedBy: "Sarah Johnson",
//   },
//   {
//     id: "REQ-2023-005",
//     clientName: "Michael Brown",
//     type: "Individual",
//     status: "Validated",
//     date: "2023-04-20",
//     completedDate: "2023-04-30",
//     completedBy: "Emma Davis",
//   },
//   {
//     id: "REQ-2023-006",
//     clientName: "Global Enterprises Inc",
//     type: "Corporate",
//     status: "Validated",
//     date: "2023-04-15",
//     completedDate: "2023-04-25",
//     completedBy: "Sarah Johnson",
//   },
//   {
//     id: "REQ-2023-007",
//     clientName: "Emma Wilson",
//     type: "Individual",
//     status: "Rejected",
//     date: "2023-04-10",
//     completedDate: "2023-04-20",
//     completedBy: "Michael Brown",
//   },
// ]

// const statusColors: Record<string, string> = {
//   Validated: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
//   Rejected: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
// }

// const typeIcons: Record<string, React.ReactNode> = {
//   Individual: <Users className="h-4 w-4" />,
//   Corporate: <Users className="h-4 w-4" />,
//   Entrepreneur: <Users className="h-4 w-4" />,
// }

// export function ArchiveView() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [clientType, setClientType] = useState("all");
//   const [status, setStatus] = useState("all");
//   const [dateRange, setDateRange] = useState<{
//     from: Date | undefined;
//     to: Date | undefined;
//   }>({
//     from: undefined,
//     to: undefined,
//   });

//   // Filter requests based on search term and filters
//   const filteredRequests = archivedRequestsData
//     .filter((request) => {
//       const matchesSearch = request.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                            request.id.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesType = clientType === "all" || request.type === clientType;
//       const matchesStatus = status === "all" || request.status === status;
      
//       // Filter by date range if set
//       let matchesDate = true;
//       if (dateRange.from) {
//         const requestDate = new Date(request.completedDate);
//         matchesDate = requestDate >= dateRange.from;
        
//         if (dateRange.to) {
//           matchesDate = matchesDate && requestDate <= dateRange.to;
//         }
//       }
      
//       return matchesSearch && matchesType && matchesStatus && matchesDate;
//     })
//     // Sort by completed date (newest first)
//     .sort((a, b) => {
//       return new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime();
//     });

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">Archive</h1>
//         <p className="text-muted-foreground">
//           View and manage completed account opening requests
//         </p>
//       </div>
// )
// }
