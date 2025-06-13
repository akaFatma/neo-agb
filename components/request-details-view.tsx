"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Send, AlertTriangle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"
import { InterviewSchedulerModal } from "@/components/interview-scheduler-modal"
import { ReuploadRequestModal } from "@/components/reupload-request-modal"
import { EscalateModal } from "@/components/escalate-modal"

// Mock data for a specific request
const requestData = {
  id: "REQ-2023-001",
  clientName: "John Smith",
  type: "Individuel",
  status: "En cours d'examen",
  date: "2023-06-12",
  anomalies: ["Document manquant", "Adresse non concordante"],
  priority: "élevée",
  documents: [
    { name: "Carte d'identité", status: "Vérifié", url: "#" },
    { name: "Justificatif de domicile", status: "Manquant", url: null },
    { name: "Relevé de revenus", status: "Non concordant", url: "#" },
  ],
  comparisonData: [
    {
      field: "Nom complet",
      userInput: "John Smith",
      extracted: "John Smith",
      match: true,
    },
    {
      field: "Date de naissance",
      userInput: "1985-04-12",
      extracted: "1985-04-12",
      match: true,
    },
    {
      field: "Adresse",
      userInput: "123 Main St, New York",
      extracted: "123 Main St, Boston",
      match: false,
    },
    {
      field: "Numéro de téléphone",
      userInput: "+1 555-1234",
      extracted: "+1 555-1234",
      match: true,
    },
    {
      field: "Email",
      userInput: "john.smith@example.com",
      extracted: "john.smith@example.com",
      match: true,
    },
    {
      field: "Numéro d'identité",
      userInput: "ID-12345678",
      extracted: "ID-12345678",
      match: true,
    },
    {
      field: "Profession",
      userInput: "Ingénieur logiciel",
      extracted: "Développeur logiciel",
      match: false,
    },
  ],
  interviewHistory: [
    {
      date: "2023-06-10",
      time: "14:30",
      status: "Terminée",
      notes:
        "Le client a confirmé son identité et fourni des documents supplémentaires.",
    },
  ],
  messages: [
    {
      sender: "system",
      content: "Demande soumise par le client",
      timestamp: "2023-06-08T10:30:00",
    },
    {
      sender: "agent",
      content: "Justificatif de domicile supplémentaire demandé",
      timestamp: "2023-06-09T14:15:00",
    },
    {
      sender: "client",
      content: "Nouveau justificatif de domicile téléversé",
      timestamp: "2023-06-09T16:45:00",
    },
    {
      sender: "agent",
      content: "Entretien vidéo programmé pour vérification",
      timestamp: "2023-06-10T09:20:00",
    },
    {
      sender: "system",
      content: "Entretien vidéo terminé",
      timestamp: "2023-06-10T14:45:00",
    },
  ],
};


export function RequestDetailsView({ requestId }: { requestId: string }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false)
  const [isReuploadModalOpen, setIsReuploadModalOpen] = useState(false)
  const [isEscalateModalOpen, setIsEscalateModalOpen] = useState(false)
  const [isValidating, setIsValidating] = useState(false)

  // Calculate completion percentage
  const totalDocuments = requestData.documents.length
  const completedDocuments = requestData.documents.filter((doc) => doc.status === "Verified").length
  const completionPercentage = Math.round((completedDocuments / totalDocuments) * 100)

  const handleValidate = () => {
    setIsValidating(true)

    // Simulate API call
    setTimeout(() => {
      setIsValidating(false)
      toast({
        variant: "success",
        title: "Request Validated",
        description: "The request has been successfully validated.",
      })

      // In a real app, we would navigate back to the dashboard after validation
      router.push("/dashboard")
    }, 1500)
  }

  const statusColors: Record<string, string> = {
    New: "bg-blue-100 text-blue-700",
    Review: "bg-amber-100 text-amber-700",
    Scheduled: "bg-purple-100 text-purple-700",
    Escalated: "bg-red-100 text-red-700",
    Validated: "bg-green-100 text-green-700",
  }

  const documentStatusColors: Record<string, string> = {
    Verified: "text-green-600",
    Missing: "text-red-600",
    Mismatch: "text-amber-600",
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header with back button */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/dashboard")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">
              details de requete
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={statusColors[requestData.status]}>
              {requestData.status}
            </Badge>
            <Badge variant="outline" className="font-mono">
              {requestData.id}
            </Badge>
          </div>
        </div>

        {/* Client info card */}
        <Card className="shadow-custom">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">{requestData.clientName}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Type
                  </div>
                  <div>{requestData.type}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    date de soumission
                  </div>
                  <div>{new Date(requestData.date).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Anomalies
                  </div>
                  <div>{requestData.anomalies.length}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Priorité
                  </div>
                  <div className="capitalize">{requestData.priority}</div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <div className="text-sm font-medium">Achèvement</div>
                  <div className="text-sm font-medium">
                    {completionPercentage}%
                  </div>
                </div>
                <Progress value={completionPercentage} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left column - Data comparison */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="comparison">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="comparison">
                  date de comparaison
                </TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="history">Historique</TabsTrigger>
              </TabsList>

              <TabsContent value="comparison" className="mt-4">
                <Card className="shadow-custom">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      informations de client vs. données extrait par OCR
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 font-medium text-sm">
                        <div>Champ</div>
                        <div>saisie de client</div>
                        <div>extrait</div>
                      </div>
                      {requestData.comparisonData.map((item, index) => (
                        <div
                          key={index}
                          className={`grid grid-cols-3 gap-4 text-sm py-2 ${
                            !item.match
                              ? "bg-amber-50 -mx-6 px-6 border-l-4 border-amber-500"
                              : ""
                          }`}
                        >
                          <div className="font-medium">{item.field}</div>
                          <div>{item.userInput}</div>
                          <div className="flex items-center gap-2">
                            {item.extracted}
                            {!item.match && (
                              <AlertTriangle className="h-4 w-4 text-amber-500" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="mt-4">
                <Card className="shadow-custom">
                  <CardHeader>
                    <CardTitle className="text-lg">Documents requis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {requestData.documents.map((doc, index) => (
                        <div
                          key={index}
                          className={`flex items-center justify-between p-3 rounded-md ${
                            doc.status !== "Verified" ? "bg-muted" : ""
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                doc.status === "Verified"
                                  ? "bg-green-500"
                                  : doc.status === "Missing"
                                  ? "bg-red-500"
                                  : "bg-amber-500"
                              }`}
                            />
                            <span>{doc.name}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={documentStatusColors[doc.status]}>
                              {doc.status}
                            </span>
                            {doc.url && (
                              <Button variant="outline" size="sm" asChild>
                                <a
                                  href={doc.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Voir
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="mt-4">
                <Card className="shadow-custom">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      histprique d'activité
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {requestData.messages.map((message, index) => (
                        <div
                          key={index}
                          className="flex gap-4 pb-4 border-b last:border-0"
                        >
                          <div
                            className={`w-2 h-2 mt-2 rounded-full ${
                              message.sender === "system"
                                ? "bg-blue-500"
                                : message.sender === "agent"
                                ? "bg-purple-500"
                                : "bg-green-500"
                            }`}
                          />
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <span className="font-medium capitalize">
                                {message.sender}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {new Date(message.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <p className="mt-1">{message.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right column - Actions */}
          <div className="space-y-6">
            <Card className="shadow-custom">
              <CardHeader>
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  className="w-full gap-2"
                  onClick={() => setIsInterviewModalOpen(true)}
                >
                  <Calendar className="h-4 w-4" />
                  Planifier un entretien
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => setIsReuploadModalOpen(true)}
                >
                  <Send className="h-4 w-4" />
                  renvoyer une demande
                </Button>
                <Button
                  className="w-full gap-2"
                  onClick={handleValidate}
                  disabled={isValidating}
                >
                  <CheckCircle className="h-4 w-4" />
                  {isValidating ? "Validating..." : "Validate"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2 text-red-600 hover:text-red-700"
                  onClick={() => setIsEscalateModalOpen(true)}
                >
                  <AlertTriangle className="h-4 w-4" />
                  Faire remonter
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-custom">
              <CardHeader>
                <CardTitle className="text-lg">historique des entretiens </CardTitle>
              </CardHeader>
              <CardContent>
                {requestData.interviewHistory.length > 0 ? (
                  <div className="space-y-4">
                    {requestData.interviewHistory.map((interview, index) => (
                      <div key={index} className="flex flex-col gap-1">
                        <div className="flex justify-between">
                          <span className="font-medium">
                            {interview.date} at {interview.time}
                          </span>
                          <Badge>{interview.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {interview.notes}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    pas d'entrentien planifier 
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <InterviewSchedulerModal
        open={isInterviewModalOpen}
        onOpenChange={setIsInterviewModalOpen}
        clientName={requestData.clientName}
        requestId={requestData.id}
      />

      <ReuploadRequestModal
        open={isReuploadModalOpen}
        onOpenChange={setIsReuploadModalOpen}
        clientName={requestData.clientName}
        requestId={requestData.id}
      />

      <EscalateModal
        open={isEscalateModalOpen}
        onOpenChange={setIsEscalateModalOpen}
        clientName={requestData.clientName}
        requestId={requestData.id}
      />
    </>
  );
}
