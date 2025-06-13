"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Calendar, CheckCircle, Clock, FileText, Search, Users } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data for the dashboard
const summaryData = [
  {
    title: "Total Requests",
    value: 124,
    icon: FileText,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Anomalies",
    value: 18,
    icon: AlertTriangle,
    color: "bg-amber-100 text-amber-700",
  },
  {
    title: "Interviews",
    value: 32,
    icon: Calendar,
    color: "bg-purple-100 text-purple-700",
  },
  {
    title: "Validated",
    value: 74,
    icon: CheckCircle,
    color: "bg-green-100 text-green-700",
  },
]

const requestsData = [
  {
    id: "REQ-2023-001",
    clientName: "John Smith",
    type: "Individual",
    status: "New",
    date: "2023-06-12",
    anomalies: ["Missing document", "Address mismatch"],
    priority: "high",
    anomalyDetails: "The address on the ID doesn't match the application form.",
  },
  {
    id: "REQ-2023-002",
    clientName: "Acme Corp",
    type: "Corporate",
    status: "Review",
    date: "2023-06-11",
    anomalies: ["Signature mismatch"],
    priority: "medium",
    anomalyDetails: "The signature on the form doesn't match the one on the ID.",
  },
  {
    id: "REQ-2023-003",
    clientName: "Sarah Johnson",
    type: "Individual",
    status: "Scheduled",
    date: "2023-06-10",
    anomalies: [],
    priority: "normal",
    anomalyDetails: "",
  },
  {
    id: "REQ-2023-004",
    clientName: "Tech Startups LLC",
    type: "Entrepreneur",
    status: "Escalated",
    date: "2023-06-09",
    anomalies: ["Document expiration", "Inconsistent information"],
    priority: "high",
    anomalyDetails: "Business registration document is expired. Owner information is inconsistent.",
  },
  {
    id: "REQ-2023-005",
    clientName: "Michael Brown",
    type: "Individual",
    status: "New",
    date: "2023-06-08",
    anomalies: ["ID verification failed"],
    priority: "high",
    anomalyDetails: "ID verification failed. The document appears to be altered.",
  },
  {
    id: "REQ-2023-006",
    clientName: "Global Enterprises Inc",
    type: "Corporate",
    status: "Validated",
    date: "2023-06-07",
    anomalies: [],
    priority: "normal",
    anomalyDetails: "",
  },
  {
    id: "REQ-2023-007",
    clientName: "Emma Wilson",
    type: "Individual",
    status: "Review",
    date: "2023-06-06",
    anomalies: ["Missing document"],
    priority: "medium",
    anomalyDetails: "Proof of address document is missing.",
  },
]

const statusColors: Record<string, string> = {
  New: "bg-blue-100 text-blue-700",
  Review: "bg-amber-100 text-amber-700",
  Scheduled: "bg-purple-100 text-purple-700",
  Escalated: "bg-red-100 text-red-700",
  Validated: "bg-green-100 text-green-700",
}

const typeIcons: Record<string, React.ReactNode> = {
  Individual: <Users className="h-4 w-4" />,
  Corporate: <Users className="h-4 w-4" />,
  Entrepreneur: <Users className="h-4 w-4" />,
}

export function DashboardView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [clientType, setClientType] = useState("all")
  const [riskLevel, setRiskLevel] = useState("all")

  // Filter requests based on search term and filters
  const filteredRequests = requestsData
    .filter((request) => {
      const matchesSearch =
        request.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.id.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = clientType === "all" || request.type === clientType
      const matchesRisk =
        riskLevel === "all" ||
        (riskLevel === "high" && request.priority === "high") ||
        (riskLevel === "medium" && request.priority === "medium") ||
        (riskLevel === "low" && request.priority === "normal")
      return matchesSearch && matchesType && matchesRisk
    })
    // Sort by priority (high first) and then by date (newest first)
    .sort((a, b) => {
      if (a.priority === "high" && b.priority !== "high") return -1
      if (a.priority !== "high" && b.priority === "high") return 1
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of account opening requests and their status</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryData.map((item, index) => (
          <Card key={index} className="shadow-custom">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <div className={cn("p-2 rounded-full", item.color)}>
                <item.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground">
                {item.title === "Anomalies"
                  ? "+2 since yesterday"
                  : item.title === "Total Requests"
                    ? "+5 since yesterday"
                    : item.title === "Validated"
                      ? "+3 since yesterday"
                      : "+1 since yesterday"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by client name or request ID..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={clientType} onValueChange={setClientType}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Client Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Individual">Individual</SelectItem>
            <SelectItem value="Entrepreneur">Entrepreneur</SelectItem>
            <SelectItem value="Corporate">Corporate</SelectItem>
          </SelectContent>
        </Select>
        <Select value={riskLevel} onValueChange={setRiskLevel}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Risk Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="high">High Risk</SelectItem>
            <SelectItem value="medium">Medium Risk</SelectItem>
            <SelectItem value="low">Low Risk</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Request List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Client Requests</h2>
          <div className="text-sm text-muted-foreground">
            Showing {filteredRequests.length} of {requestsData.length} requests
          </div>
        </div>

        <div className="grid gap-4">
          {filteredRequests.map((request) => (
            <Card
              key={request.id}
              className={cn(
                "transition-shadow hover:shadow-md",
                request.priority === "high" ? "border-l-4 border-l-red-500" : "",
              )}
            >
              <CardContent className="p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{request.clientName}</h3>
                      <Badge variant="outline" className="flex items-center gap-1">
                        {typeIcons[request.type]}
                        {request.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{request.id}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(request.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Badge className={statusColors[request.status]}>{request.status}</Badge>
                      <TooltipProvider>
                        {request.anomalies.map((anomaly, index) => (
                          <Tooltip key={index}>
                            <TooltipTrigger asChild>
                              <Badge
                                variant="outline"
                                className="flex items-center gap-1 border-amber-500 text-amber-700"
                              >
                                <AlertTriangle className="h-3 w-3" />
                                {anomaly}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{request.anomalyDetails}</p>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </TooltipProvider>
                    </div>
                  </div>
                  <Button asChild>
                    <Link href={`/dashboard/requests/${request.id}`}>Open Request</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredRequests.length === 0 && (
            <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
              <div className="flex flex-col items-center gap-1 text-center">
                <FileText className="h-10 w-10 text-muted-foreground" />
                <h3 className="font-semibold">No requests found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
