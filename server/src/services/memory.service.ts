export type MessageRole = "user" | "assistant";

export interface ConversationMessage {
    role: MessageRole;
    content: string;
}

const conversations = new Map<
    string,
    ConversationMessage[]
>();

const MAX_HISTORY_MESSAGES = 10;

export function getConversationHistory(
    conversationId: string
): ConversationMessage[] {
    const history = conversations.get(conversationId) || [];

    return history.slice(-MAX_HISTORY_MESSAGES);
}

export function addMessage(
    conversationId: string,
    message: ConversationMessage
): void {
    const history =
        conversations.get(conversationId) || [];

    history.push(message);

    conversations.set(conversationId, history);
}

export function clearConversation(
    conversationId: string
): void {
    conversations.delete(conversationId);
}