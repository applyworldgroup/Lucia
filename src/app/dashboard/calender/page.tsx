'use client'

import { useState, useCallback } from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ArrowRight, CalendarIcon, Clock, MapPin, Plus, Trash2 } from 'lucide-react'

// Import the CSS for react-big-calendar
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Button } from '@/components/ui/button'

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
}

const CustomEventWrapper = ({ children }) => (
    <div className='h-[200px] '>{children}</div>
  )
// Custom event component
const CustomEvent = ({ event }: { event: Event }) => (
  <div className="h-[70px]  p-0 m-0 flex items-center">
    <div>
    <strong>{event.title}</strong>
    <div className="text-xs">{moment(event.start).format('h:mm A')}</div>
    </div>
  </div>
)

const CustomToolbar = ({ label, onNavigate, onView }) => (
  <div className="flex justify-between items-center  py-4">
    <div className='flex items-center gap-8'>
      <Button onClick={() => onNavigate('PREV')} variant={"outline"}className='flex gap-2'><ArrowLeft size={15}/> Prev </Button>
    <span className="">{label}</span>
      <Button onClick={() => onNavigate('NEXT')} variant={"outline"} className='flex gap-2'>Next <ArrowRight size={15}/></Button>
    </div>
    <div>
      <Button onClick={() => onView(Views.MONTH)} variant={"outline"} className='rounded-r-none'>Month</Button>
      <Button onClick={() => onView(Views.WEEK)} variant={"outline"} className='rounded-none'>Week</Button>
      <Button onClick={() => onView(Views.DAY)}  variant={"outline"} className='rounded-none'>Day</Button>
      <Button onClick={() => onView(Views.AGENDA)}  variant={"outline"} className='rounded-l-none'>Agenda</Button>
    </div>
  </div>
)



const CustomHeader = ({ label }) => (
  <div className='bg-black text-white h-[60px] w-full flex items-center justify-center p-6 uppercase'>
    {label}
  </div>
)


const CustomDayHeader = ({ label }) => (
  <div className="text-xs font-semibold text-gray-700 p-2 bg-white border-b border-gray-200">
    {label}
  </div>
)

const CustomDateCell = ({ children }) => {
  return (
    <div className={`h-full flex flex-col border-4 w-full border-secondary`}>
      <div className="flex-1 p-2">
        {children}
      </div>
    </div>
  )
}

export default function Component() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Team Meeting',
      start: moment().add(1, 'days').hour(9).minute(30).toDate(),
      end: moment().add(1, 'days').hour(10).minute(30).toDate(),
      description: 'Weekly team sync-up',
      location: 'Conference Room A'
    },
    {
      id: 2,
      title: 'Product Launch',
      start: moment().add(3, 'days').hour(14).minute(0).toDate(),
      end: moment().add(3, 'days').hour(16).minute(0).toDate(),
      description: 'New product line introduction',
      location: 'Main Auditorium'
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
    location: ''
  })
  const [view, setView] = useState(Views.MONTH)

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      setNewEvent({ title: '', start, end, description: '', location: '' })
      setShowAddModal(true)
    },
    []
  )

  const handleSelectEvent = useCallback((event: Event) => {
    setSelectedEvent(event)
    setShowEventModal(true)
  }, [])

  const handleAddEvent = () => {
    if (newEvent.title) {
      setEvents((prev) => [...prev, { ...newEvent, id: Date.now() } as Event])
      setShowAddModal(false)
      setNewEvent({ title: '', start: new Date(), end: new Date(), description: '', location: '' })
    }
  }

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents((prev) => prev.filter((e) => e.id !== selectedEvent.id))
      setShowEventModal(false)
      setSelectedEvent(null)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Company Calendar</h1>
      <div className="mb-6 flex justify-between items-center">
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Event
        </Button>
      </div>
      <div className="h-[600px] bg-white rounded-lg shadow-lg overflow-hidden">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          view={view}
          onView={setView}
          components={{
            toolbar: CustomToolbar,
            event: CustomEvent,
            eventWrapper: CustomEventWrapper,
            dateCellWrapper: CustomDateCell,
            header: CustomHeader,
            dayHeader: CustomDayHeader,
          }}
           className="custom-calendar"
        />
      </div>

      {/* Add Event Modal */}
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
            <Button variant="destructive" onClick={handleDeleteEvent}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}