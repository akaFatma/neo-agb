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
    "Suspected fraud",
    "Complex corporate structure",
    "High-risk jurisdiction",
    "Politically exposed person",
    "Unusual transaction patterns",
    "Other compliance concerns",
  ]

  const handleEscalate = () => {
    if (!reason) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please select an escalation reason.",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Request Escalated",
        description: `Request for ${clientName} has been escalated to Compliance.`,
      })

      // Reset form and close modal
      setReason("")
      setComments("")
      onOpenChange(false)
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            Escalate to Compliance
          </DialogTitle>
          <DialogDescription>
            Escalate request {requestId} for {clientName} to the Compliance team for further review.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="reason" className="text-sm font-medium">
              Escalation Reason
            </label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger id="reason">
                <SelectValue placeholder="Select reason for escalation" />
              </SelectTrigger>
              <SelectContent>
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
              Additional Comments
            </label>
            <Textarea
              id="comments"
              placeholder="Provide details about why this request needs compliance review..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleEscalate}
            className="gap-1 bg-red-600 hover:bg-red-700 text-white"
            disabled={isSubmitting}
          >
            <Send className="h-4 w-4" />
            {isSubmitting ? "Submitting..." : "Escalate Request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
