"use client"

import { useState } from "react"
import { CalendarIcon, Mic, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

interface InterviewSchedulerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  clientName: string
  requestId: string
}

export function InterviewSchedulerModal({ open, onOpenChange, clientName, requestId }: InterviewSchedulerModalProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState<string | undefined>(undefined)
  const [meetingType, setMeetingType] = useState<string>("video")
  const [notes, setNotes] = useState<string>("")
  const [isRecording, setIsRecording] = useState(false)

  const handleSchedule = () => {
    if (!date || !time) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please select both date and time for the interview.",
      })
      return
    }

    // In a real app, this would send the data to an API
    toast({
      variant: "success",
      title: "Interview Scheduled",
      description: `Interview with ${clientName} scheduled for ${format(date, "PPP")} at ${time}.`,
    })

    // Reset form and close modal
    setDate(undefined)
    setTime(undefined)
    setNotes("")
    onOpenChange(false)

    // Navigate to interview page
    router.push("/dashboard/interview")
  }

  const toggleRecording = () => {
    // In a real app, this would start/stop speech recognition
    setIsRecording(!isRecording)

    if (isRecording) {
      // Simulate speech recognition result
      setNotes(notes + " Client requested evening appointments due to work schedule.")
      toast({
        title: "Speech Recognition Complete",
        description: "Your speech has been converted to text.",
      })
    } else {
      toast({
        title: "Recording Started",
        description: "Speak clearly to record your notes.",
      })
    }
  }

  // Generate time slots from 9 AM to 5 PM in 30-minute intervals
  const timeSlots = []
  for (let hour = 9; hour <= 17; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, "0")
      const formattedMinute = minute.toString().padStart(2, "0")
      timeSlots.push(`${formattedHour}:${formattedMinute}`)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle>Planifier un entretien</DialogTitle>
          <DialogDescription>
            Planifiez un entretien vidéo ou téléphonique avec {clientName} pour
            la demande {requestId}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label htmlFor="date" className="text-sm font-medium">
                Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Sélectionner une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <label htmlFor="time" className="text-sm font-medium">
                Heure
              </label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger id="time">
                  <SelectValue placeholder="Sélectionner une heure" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <label htmlFor="meeting-type" className="text-sm font-medium">
              Type de rendez-vous
            </label>
            <Select value={meetingType} onValueChange={setMeetingType}>
              <SelectTrigger id="meeting-type">
                <SelectValue placeholder="Sélectionner un type de rendez-vous" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="video">Appel vidéo</SelectItem>
                <SelectItem value="phone">Appel téléphonique</SelectItem>
                <SelectItem value="in-person">En présentiel</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="notes" className="text-sm font-medium">
                Notes
              </label>
              <Button
                type="button"
                size="sm"
                variant={isRecording ? "destructive" : "outline"}
                className="h-8 gap-1"
                onClick={toggleRecording}
              >
                <Mic className="h-3.5 w-3.5" />
                {isRecording ? "Arrêter l'enregistrement" : "Enregistrer"}
              </Button>
            </div>
            <Textarea
              id="notes"
              placeholder="Ajouter des notes sur l'entretien..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button type="button" onClick={handleSchedule} className="gap-1">
            <Send className="h-4 w-4" />
            Planifier l'entretien
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
