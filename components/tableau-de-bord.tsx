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

// Données fictives pour le tableau de bord
const donneesResume = [
  {
    title: "Total Demandes",
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
    title: "Entretiens",
    value: 32,
    icon: Calendar,
    color: "bg-purple-100 text-purple-700",
  },
  {
    title: "Validées",
    value: 74,
    icon: CheckCircle,
    color: "bg-green-100 text-green-700",
  },
]

const donneesDemandes = [
  {
    id: "DEM-2023-001",
    clientName: "Jean Dupont",
    type: "Particulier",
    status: "Nouveau",
    date: "2023-06-12",
    anomalies: ["Document manquant", "Adresse non concordante"],
    priority: "high",
    anomalyDetails: "L'adresse sur la pièce d'identité ne correspond pas à celle du formulaire.",
  },
  {
    id: "DEM-2023-002",
    clientName: "Acme Corp",
    type: "Entreprise",
    status: "En revue",
    date: "2023-06-11",
    anomalies: ["Signature non concordante"],
    priority: "medium",
    anomalyDetails: "La signature sur le formulaire ne correspond pas à celle de la pièce d'identité.",
  },
  {
    id: "DEM-2023-003",
    clientName: "Marie Martin",
    type: "Particulier",
    status: "Programmé",
    date: "2023-06-10",
    anomalies: [],
    priority: "normal",
    anomalyDetails: "",
  },
  {
    id: "DEM-2023-004",
    clientName: "Tech Startups SAS",
    type: "Entrepreneur",
    status: "Escaladé",
    date: "2023-06-09",
    anomalies: ["Document expiré", "Informations incohérentes"],
    priority: "high",
    anomalyDetails:
      "Le document d'enregistrement de l'entreprise est expiré. Les informations du propriétaire sont incohérentes.",
  },
  {
    id: "DEM-2023-005",
    clientName: "Michel Blanc",
    type: "Particulier",
    status: "Nouveau",
    date: "2023-06-08",
    anomalies: ["Vérification d'identité échouée"],
    priority: "high",
    anomalyDetails: "La vérification d'identité a échoué. Le document semble avoir été modifié.",
  },
  {
    id: "DEM-2023-006",
    clientName: "Global Enterprises SA",
    type: "Entreprise",
    status: "Validé",
    date: "2023-06-07",
    anomalies: [],
    priority: "normal",
    anomalyDetails: "",
  },
  {
    id: "DEM-2023-007",
    clientName: "Emma Wilson",
    type: "Particulier",
    status: "En revue",
    date: "2023-06-06",
    anomalies: ["Document manquant"],
    priority: "medium",
    anomalyDetails: "Le justificatif de domicile est manquant.",
  },
]

const couleursStatut: Record<string, string> = {
  Nouveau: "bg-blue-100 text-blue-700",
  "En revue": "bg-amber-100 text-amber-700",
  Programmé: "bg-purple-100 text-purple-700",
  Escaladé: "bg-red-100 text-red-700",
  Validé: "bg-green-100 text-green-700",
}

const iconesType: Record<string, React.ReactNode> = {
  Particulier: <Users className="h-4 w-4" />,
  Entreprise: <Users className="h-4 w-4" />,
  Entrepreneur: <Users className="h-4 w-4" />,
}

export function TableauDeBord() {
  const [searchTerm, setSearchTerm] = useState("")
  const [clientType, setClientType] = useState("all")
  const [riskLevel, setRiskLevel] = useState("all")

  // Filtrer les demandes en fonction des termes de recherche et des filtres
  const demandesFiltrees = donneesDemandes
    .filter((demande) => {
      const matchesSearch =
        demande.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        demande.id.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = clientType === "all" || demande.type === clientType
      const matchesRisk =
        riskLevel === "all" ||
        (riskLevel === "high" && demande.priority === "high") ||
        (riskLevel === "medium" && demande.priority === "medium") ||
        (riskLevel === "low" && demande.priority === "normal")
      return matchesSearch && matchesType && matchesRisk
    })
    // Trier par priorité (élevée d'abord) puis par date (plus récente d'abord)
    .sort((a, b) => {
      if (a.priority === "high" && b.priority !== "high") return -1
      if (a.priority !== "high" && b.priority === "high") return 1
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground">Aperçu des demandes d'ouverture de compte et leur statut</p>
      </div>

      {/* Cartes de résumé */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {donneesResume.map((item, index) => (
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
                  ? "+2 depuis hier"
                  : item.title === "Total Demandes"
                    ? "+5 depuis hier"
                    : item.title === "Validées"
                      ? "+3 depuis hier"
                      : "+1 depuis hier"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filtres */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom de client ou ID de demande..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={clientType} onValueChange={setClientType}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Type de client" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value="Particulier">Particulier</SelectItem>
            <SelectItem value="Entrepreneur">Entrepreneur</SelectItem>
            <SelectItem value="Entreprise">Entreprise</SelectItem>
          </SelectContent>
        </Select>
        <Select value={riskLevel} onValueChange={setRiskLevel}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Niveau de risque" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les niveaux</SelectItem>
            <SelectItem value="high">Risque élevé</SelectItem>
            <SelectItem value="medium">Risque moyen</SelectItem>
            <SelectItem value="low">Risque faible</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Liste des demandes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Demandes clients</h2>
          <div className="text-sm text-muted-foreground">
            Affichage de {demandesFiltrees.length} sur {donneesDemandes.length} demandes
          </div>
        </div>

        <div className="grid gap-4">
          {demandesFiltrees.map((demande) => (
            <Card
              key={demande.id}
              className={cn(
                "transition-shadow hover:shadow-md",
                demande.priority === "high" ? "border-l-4 border-l-red-500" : "",
              )}
            >
              <CardContent className="p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{demande.clientName}</h3>
                      <Badge variant="outline" className="flex items-center gap-1">
                        {iconesType[demande.type]}
                        {demande.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{demande.id}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(demande.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Badge className={couleursStatut[demande.status]}>{demande.status}</Badge>
                      <TooltipProvider>
                        {demande.anomalies.map((anomalie, index) => (
                          <Tooltip key={index}>
                            <TooltipTrigger asChild>
                              <Badge
                                variant="outline"
                                className="flex items-center gap-1 border-amber-500 text-amber-700"
                              >
                                <AlertTriangle className="h-3 w-3" />
                                {anomalie}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{demande.anomalyDetails}</p>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </TooltipProvider>
                    </div>
                  </div>
                  <Button asChild>
                    <Link href={`/dashboard/requests/${demande.id}`}>Ouvrir la demande</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {demandesFiltrees.length === 0 && (
            <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
              <div className="flex flex-col items-center gap-1 text-center">
                <FileText className="h-10 w-10 text-muted-foreground" />
                <h3 className="font-semibold">Aucune demande trouvée</h3>
                <p className="text-sm text-muted-foreground">Essayez d'ajuster votre recherche ou vos filtres</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
