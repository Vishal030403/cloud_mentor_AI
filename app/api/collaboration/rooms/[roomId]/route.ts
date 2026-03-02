import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { DEMO_USER_ID } from '@/lib/demo-user'

type Params = {
  params: Promise<{ roomId: string }>
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { roomId } = await params
    const body = (await request.json()) as { title?: string }
    const title = body.title?.trim()

    if (!title) {
      return NextResponse.json({ error: 'title is required' }, { status: 400 })
    }

    const roomRows = await query<{ created_by: string }>(
      'SELECT created_by FROM collaboration_rooms WHERE id = $1 LIMIT 1',
      [roomId],
    )

    if (!roomRows[0]) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 })
    }

    if (roomRows[0].created_by !== DEMO_USER_ID) {
      return NextResponse.json({ error: 'Only owner can rename this room' }, { status: 403 })
    }

    const updated = await query<{
      id: string
      title: string
      topic: string
      created_by: string
      is_active: boolean
      members: Array<{ user_id: string; joined_at: string; email?: string }>
      created_at: string
      updated_at: string
    }>(
      `UPDATE collaboration_rooms
       SET title = $1, updated_at = NOW()
       WHERE id = $2
       RETURNING id, title, topic, created_by, is_active, members, created_at, updated_at`,
      [title, roomId],
    )

    return NextResponse.json({ room: updated[0] })
  } catch (error) {
    console.error('PUT /api/collaboration/rooms/[roomId] failed:', error)
    return NextResponse.json({ error: 'Failed to rename room' }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    const { roomId } = await params
    const roomRows = await query<{ created_by: string }>(
      'SELECT created_by FROM collaboration_rooms WHERE id = $1 LIMIT 1',
      [roomId],
    )

    if (!roomRows[0]) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 })
    }

    if (roomRows[0].created_by !== DEMO_USER_ID) {
      return NextResponse.json({ error: 'Only owner can delete this room' }, { status: 403 })
    }

    await query('DELETE FROM collaboration_rooms WHERE id = $1', [roomId])

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('DELETE /api/collaboration/rooms/[roomId] failed:', error)
    return NextResponse.json({ error: 'Failed to delete room' }, { status: 500 })
  }
}
