import type {
  ApiMessage,
  ApiMessageThread,
  Message,
  MessageThread,
} from "../types/threads.js";

/**
 * Transform API message to domain model
 */
export function apiMessageToDomain(m: ApiMessage, threadId: string): Message {
  return {
    id: m.id,
    threadId,
    body: m.body,
    createdAt: new Date(m.created),
    author: m.sender?.name ?? m.receiver?.name ?? null,
  };
}

/**
 * Transform API thread data to domain model
 */
export function apiThreadToDomain(
  results: ApiMessageThread[]
): MessageThread[] {
  return results.map((t) => ({
    id: t.id,
    relatedEntity: t.relatedEntity,
    relatedEntityType: t.relatedEntityType ?? null,
    hasUnreadMessages: t.hasUnreadMessages ?? false,
    hasAttachments: t.hasAttachments ?? false,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastMessage: t.lastMessage ? apiMessageToDomain(t.lastMessage, t.id) : null,
  }));
}
