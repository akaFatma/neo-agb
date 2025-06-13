// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { ArrowLeft } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { useToast } from "@/hooks/use-toast"

// // Données fictives pour une demande spécifique
// const donneesDemande = {
//   id: "DEM-2023-001",
//   clientName: "Jean Dupont",
//   type: "Particulier",
//   status: "En revue",
//   date: "2023-06-12",
//   anomalies: ["Document manquant", "Adresse non concordante"],
//   priority: "high",
//   documents: [
//     { name: "Carte d'identité", status: "Vérifié", url: "#" },
//     { name: "Justificatif de domicile", status: "Manquant", url: null },
//     { name: "Relevé de revenus", status: "Non concordant", url: "#" },
//   ],
//   comparisonData: [
//     { field: "Nom complet", userInput: "Jean Dupont", extracted: "Jean Dupont", match: true },
//     { field: "Date de naissance", userInput: "12/04/1985", extracted: "12/04/1985", match: true },
//     { field: "Adresse", userInput: "123 Rue Principale, Paris", extracted: "123 Rue Principale, Lyon", match: false },
//     { field: "Téléphone", userInput: "+33 6 12 34 56 78", extracted: "+33 6 12 34 56 78", match: true },
//     { field: "Email", userInput: "jean.dupont@example.com", extracted: "jean.dupont@example.com", match: true },
//     { field: "Numéro d'identité", userInput: "ID-12345678", extracted: "ID-12345678", match: true },
//     { field: "Profession", userInput: "Ingénieur logiciel", extracted: "Développeur logiciel", match: false },
//   ],
//   interviewHistory: [
//     {
//       date: "2023-06-10",
//       time: "14:30",
//       status: "Terminé",
//       notes: "Le client a confirmé son identité et fourni des documents supplémentaires.",
//     },
//   ],
//   messages: [
//     {
//       sender: "system",
//       content: "Demande soumise par le client",
//       timestamp: "2023-06-08T10:30:00",
//     },
//     {
//       sender: "agent",
//       content: "Demande de justificatif de domicile supplémentaire",
//       timestamp: "2023-06-09T14:15:00",
//     },
//     {
//       sender: "client",
//       content: "Nouveau justificatif de domicile téléchargé",
//       timestamp: "2023-06-09T16:45:00",
//     },
//     {
//       sender: "agent",
//       content: "Entretien vidéo programmé pour vérification",
//       timestamp: "2023-06-10T09:20:00",
//     },
//     {
//       sender: "system",
//       content: "Entretien vidéo terminé",
//       timestamp: "2023-06-10T14:45:00",
//     },
//   ],
// }

// export function DetailDemande({ demandeId }: { demandeId: string }) {
//   const router = useRouter()
//   const { toast } = useToast()
//   const [isEntretienModalOpen, setIsEntretienModalOpen] = useState(false)
//   const [isReuploadModalOpen, setIsReuploadModalOpen] = useState(false)
//   const [isEscaladeModalOpen, setIsEscaladeModalOpen] = useState(false)
//   const [isValidating, setIsValidating] = useState(false)

//   // Calculer le pourcentage de complétion
//   const totalDocuments = donneesDemande.documents.length
//   const completedDocuments = donneesDemande.documents.filter((doc) => doc.status === "Vérifié").length
//   const completionPercentage = Math.round((completedDocuments / totalDocuments) * 100)

//   const handleValidate = () => {
//     setIsValidating(true)

//     // Simuler un appel API
//     setTimeout(() => {
//       setIsValidating(false)
//       toast({
//         variant: "success",
//         title: "Demande validée",
//         description: "La demande a été validée avec succès.",
//       })

//       // Dans une vraie application, nous naviguerions vers le tableau de bord après validation
//       router.push("/dashboard")
//     }, 1500)
//   }

//   const couleursStatut: Record<string, string> = {
//     Nouveau: "bg-blue-100 text-blue-700",
//     "En revue": "bg-amber-100 text-amber-700",
//     Programmé: "bg-purple-100 text-purple-700",
//     Escaladé: "bg-red-100 text-red-700",
//     Validé: "bg-green-100 text-green-700",
//   }

//   const couleursStatutDocument: Record<string, string> = {
//     Vérifié: "text-green-600",
//     Manquant: "text-red-600",
//     "Non concordant": "text-amber-600",
//   }

//   return (
//     <>
//       <div className="space-y-6">
//         {/* En-tête avec bouton retour */}
//         <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
//           <div className="flex items-center gap-2">
//             <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
//               <ArrowLeft className="h-5 w-5" />
//             </Button>
//             <h1 className="text-2xl font-bold tracking-tight">Détails de la demande</h1>
//           </div>
//           <div className="flex items-center gap-2">
//             <Badge className={
