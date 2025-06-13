"use client"

import { useState } from "react"
import { AlertCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EscalateModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  clientName: string
  requestId: string
}

export function EscalateModal({ open, onOpenChange, clientName, requestId }: EscalateModalProps) {
  const { toast } = useToast()
  const [reason, setReason] = useState<string>("")
  const [comments, setComments] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const escalationReasons = [
    "Fraude suspectée",
    "Structure d'entreprise complexe",
    "Juridiction à haut risque",
    "Personne politiquement exposée",
    "Modèles de transactions inhabituels",
    "Autres préoccupations de conformité",
  ];
  const handleEscalate = () => {
    if (!reason) {
      toast({
        variant: "destructive",
        title: "Informations manquantes",
        description: "Veuillez sélectionner un motif d'escalade.",
      });
      return;
    }
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Demande escaladée",
        description: `La demande pour ${clientName} a été escaladée au service Conformité.`,
      });

      // Réinitialiser le formulaire et fermer la modale
      setReason("");
      setComments("");
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            Escalader au service Conformité
          </DialogTitle>
          <DialogDescription>
            Escaladez la demande {requestId} pour {clientName} au service
            Conformité pour une révision approfondie.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="reason" className="text-sm font-medium">
              Motif de l'escalade
            </label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger id="reason">
                <SelectValue placeholder="Sélectionnez un motif d'escalade" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {escalationReasons.map((reason) => (
                  <SelectItem key={reason} value={reason}>
                    {reason}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <label htmlFor="comments" className="text-sm font-medium">
              Commentaires supplémentaires
            </label>
            <Textarea
              id="comments"
              placeholder="Fournissez des détails sur la raison de cette escalade vers la conformité..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button
            onClick={handleEscalate}
            className="gap-1 bg-red-600 hover:bg-red-700 text-white"
            disabled={isSubmitting}
          >
            <Send className="h-4 w-4" />
            {isSubmitting ? "Envoi en cours..." : "Escalader la demande"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
