import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"
import type { NextRequest } from "next/server"

export async function PATCH(
  request: NextRequest,
  ctx: RouteContext<"/api/projects/[projectId]">
) {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { projectId } = await ctx.params

  const project = await prisma.project.findUnique({ where: { id: projectId } })
  if (!project) return Response.json({ error: "Not found" }, { status: 404 })
  if (project.ownerId !== userId) return Response.json({ error: "Forbidden" }, { status: 403 })

  const body: unknown = await request.json().catch(() => ({}))
  const name =
    typeof body === "object" && body !== null && "name" in body && typeof (body as { name: unknown }).name === "string"
      ? (body as { name: string }).name.trim()
      : undefined

  if (!name) return Response.json({ error: "name is required" }, { status: 400 })

  const result = await prisma.project.updateMany({
    where: { id: projectId, ownerId: userId },
    data: { name },
  })
  if (result.count === 0) {
    return Response.json({ error: "Forbidden" }, { status: 403 })
  }
  const updated = await prisma.project.findUnique({ where: { id: projectId } })
  if (!updated) return Response.json({ error: "Not found" }, { status: 404 })

  return Response.json({ project: updated })
}

export async function DELETE(
  _request: NextRequest,
  ctx: RouteContext<"/api/projects/[projectId]">
) {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { projectId } = await ctx.params

  const project = await prisma.project.findUnique({ where: { id: projectId } })
  if (!project) return Response.json({ error: "Not found" }, { status: 404 })
  if (project.ownerId !== userId) return Response.json({ error: "Forbidden" }, { status: 403 })

 const deleted = await prisma.project.deleteMany({
    where: { id: projectId, ownerId: userId },
  })
  if (deleted.count === 0) {
    return Response.json({ error: "Forbidden" }, { status: 403 })
  }

  return new Response(null, { status: 204 })
}