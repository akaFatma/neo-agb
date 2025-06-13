"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

interface ReuploadRequestModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  clientName: string
  requestId: string
}

export function ReuploadRequestModal({ open, onOpenChange, clientName, requestId }: ReuploadRequestModalProps) {
  const { toast } = useToast()
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])
  const [additionalNotes, setAdditionalNotes] = useState("")

  const documents = [
    { id: "id-card", label: "ID Card" },
    { id: "proof-address", label: "Proof of Address" },
    { id: "income-statement", label: "Income Statement" },
    { id: "tax-return", label: "Tax Return" },
    { id: "signature-sample", label: "Signature Sample" },
  ]

  const predefinedMessages = [
    "Please ensure the document is clearly visible and all corners are shown.",
    "The document appears to be expired. Please provide a valid document.",
    "The information on the document doesn't match your application details.",
    "The document quality is too low. Please rescan at a higher resolution.",
  ]

  const handleSendRequest = () => {
    if (selectedDocuments.length === 0) {
      toast({
        variant: "destructive",
        title: "No documents selected",
        description: "Please select at least one document to request.",
      })
      return
    }

    // In a real app, this would send the data to an API
    toast({
      variant: "success",
      title: "Re-upload Request Sent",
      description: `Request sent to ${clientName} for ${selectedDocuments.length} document(s).`,
    })

    // Reset form and close modal
    setSelectedDocuments([])
    setAdditionalNotes("")
    onOpenChange(false)
  }

  const toggleDocument = (documentId: string) => {
    setSelectedDocuments((prev) =>
      prev.includes(documentId) ? prev.filter((id) => id !== documentId) : [...prev, documentId],
    )
  }

  const addPredefinedMessage = (message: string) => {
    setAdditionalNotes((prev) => {
      if (prev) {
        return `${prev}\n${message}`
      }
      return message
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Request Document Re-upload</DialogTitle>
          <DialogDescription>
            Request {clientName} to re-upload documents for request {requestId}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <h3 className="mb-3 text-sm font-medium">Select Documents</h3>
            <div className="space-y-2">
              {documents.map((document) => (
                <div key={document.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={document.id}
                    checked={selectedDocuments.includes(document.id)}
                    onCheckedChange={() => toggleDocument(document.id)}
                  />
                  <label
                    htmlFor={document.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {document.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-medium">Message Templates</h3>
            <div className="flex flex-wrap gap-2">
              {predefinedMessages.map((message, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => addPredefinedMessage(message)}
                  className="text-xs"
                >
                  {message.substring(0, 20)}...
                </Button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium">Additional Notes</h3>
            <Textarea
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="Add any specific instructions or requirements..."
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSendRequest} className="gap-1">
            <Send className="h-4 w-4" />
            Send Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
