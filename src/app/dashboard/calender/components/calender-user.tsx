'use client'

import { useState, useCallback, useMemo } from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Clock, MapPin, Plus, Trash2, User } from 'lucide-react'
import { cn } from "@/lib/utils"

// Import the CSS for react-big-calendar
import 'react-big-calendar/lib/css/react-big-calendar.css'

// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment)

// Event type definition
type Event = {
  id: number
  title: string
  start: Date
  end: Date
  description: string
  location?: string
  color?: string
}

type UserRole = 'user' | 'admin' | 'superadmin'

// Custom event component
const EventComponent = ({ event }: { event: Event }) => (
  <div className="rbc-event-content" style={{ backgroundColor: event.color }}>
    <strong>{event.title}</strong>
    <div className="text-xs">{moment(event.start).format('h:mm A')}</div>
  </div>
)

// Custom toolbar component
const CustomToolbar = ({ label, onNavigate, onView, view }) => (
  <div className="rbc-toolbar">
    <div className="rbc-btn-group">
      <Button variant="outline" onClick={() => onNavigate('PREV')}>Back</Button>
      <Button variant="outline" onClick={() => onNavigate('TODAY')}>Today</Button>
      <Button variant="outline" onClick={() => onNavigate('NEXT')}>Next</Button>
    </div>
    <div className="rbc-toolbar-label">{label}</div>
    <div className="rbc-btn-group">
      <Button variant="outline" onClick={() => onView(Views.MONTH)} className={cn(view === Views.MONTH && "bg-primary text-primary-foreground")}>Month</Button>
      <Button variant="outline" onClick={() => onView(Views.WEEK)} className={cn(view === Views.WEEK && "bg-primary text-primary-foreground")}>Week</Button>
      <Button variant="outline" onClick={() => onView(Views.DAY)} className={cn(view === Views.DAY && "bg-primary text-primary-foreground")}>Day</Button>
      <Button variant="outline" onClick={() => onView(Views.AGENDA)} className={cn(view === Views.AGENDA && "bg-primary text-primary-foreground")}>Agenda</Button>
    </div>
  </div>
)

export default function UserCalender({ userRole = 'user' }: { userRole: UserRole }) {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Team Meeting',
      start: moment().add(1, 'days').hour(10).minute(0).toDate(),
      end: moment().add(1, 'days').hour(11).minute(0).toDate(),
      description: 'Weekly team sync-up',
      location: 'Conference Room A',
      color: '#3182ce'
    },
    {
      id: 2,
      title: 'Product Launch',
      start: moment().add(3, 'days').hour(14).minute(0).toDate(),
      end: moment().add(3, 'days').hour(16).minute(0).toDate(),
      description: 'New product line introduction',
      location: 'Main Auditorium',
      color: '#38a169'
    }
  ])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEventModal, setShowEventModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    start: new Date(),
    end: new Date(),
    description: '',
    location: '',
    color: '#3182ce'
  })

  const isAdmin = userRole === 'admin' || userRole === 'superadmin'

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      if (isAdmin) {
        setNewEvent({ title: '', start, end, description: '', location: '', color: '#3182ce' })
        setShowAddModal(true)
      }
    },
    [isAdmin]
  )

  const handleSelectEvent = useCallback((event: Event) => {
    setSelectedEvent(event)
    setShowEventModal(true)
  }, [])

  const handleAddEvent = () => {
    if (newEvent.title && isAdmin) {
      setEvents((prev) => [...prev, { ...newEvent, id: Date.now() } as Event])
      setShowAddModal(false)
      setNewEvent({ title: '', start: new Date(), end: new Date(), description: '', location: '', color: '#3182ce' })
    }
  }

  const handleDeleteEvent = () => {
    if (selectedEvent && isAdmin) {
      setEvents((prev) => prev.filter((e) => e.id !== selectedEvent.id))
      setShowEventModal(false)
      setSelectedEvent(null)
    }
  }

  const eventStyleGetter = useCallback((event: Event) => {
    const style = {
      backgroundColor: event.color || '#3182ce',
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    }
    return { style }
  }, [])

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Company Calendar</h1>
      <div className="mb-6 flex justify-between items-center">
        {isAdmin && (
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add New Event
          </Button>
        )}
        <div className="flex items-center space-x-2">
          <User className="h-5 w-5" />
          <span className="font-medium">{userRole}</span>
        </div>
      </div>
      <div className="h-[600px] bg-white rounded-lg shadow-lg overflow-hidden">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable={isAdmin}
          defaultDate={defaultDate}
          scrollToTime={scrollToTime}
          eventPropGetter={eventStyleGetter}
          components={{
            event: EventComponent,
            toolbar: CustomToolbar,
          }}
          style={{ height: '100%' }}
        />
      </div>

      {/* Add Event Modal */}
      {isAdmin && (
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="start" className="text-right">
                  Start
                </Label>
                <Input
                  id="start"
                  type="datetime-local"
                  value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')}
                  onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="end" className="text-right">
                  End
                </Label>
                <Input
                  id="end"
                  type="datetime-local"
                  value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')}
                  onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input
                  id="location"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="color" className="text-right">
                  Color
                </Label>
                <Input
                  id="color"
                  type="color"
                  value={newEvent.color}
                  onChange={(e) => setNewEvent({ ...newEvent, color: e.target.value })}
                  className="col-span-3 h-10"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddEvent}>Add Event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Event Details Modal */}
      <Dialog open={showEventModal} onOpenChange={setShowEventModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <p>{moment(selectedEvent?.start).format('MMMM D, YYYY')}</p>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <p>{moment(selectedEvent?.start).format('h:mm A')} - {moment(selectedEvent?.end).format('h:mm A')}</p>
            </div>
            {selectedEvent?.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <p>{selectedEvent.location}</p>
              </div>
            )}
            <p className="text-sm text-gray-500">{selectedEvent?.description}</p>
          </div>
          <DialogFooter>
            {isAdmin && (
              <Button variant="destructive" onClick={handleDeleteEvent}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete Event
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}