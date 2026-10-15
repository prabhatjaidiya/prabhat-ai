import {
  addMessage,
  getConversationHistory,
  clearConversation,
} from "../src/services/memory.service.js";

const id = "day20-memory-test";

clearConversation(id);

for (let i = 0; i < 15; i++) {
  addMessage(id, {
    role: i % 2 === 0 ? "user" : "assistant",
    content: `message-${i}`,
  });
}

const history = getConversationHistory(id);

if (history.length !== 10) {
  throw new Error(`Expected 10 messages, got ${history.length}`);
}

if (history[0].content !== "message-5") {
  throw new Error(`Unexpected first message: ${history[0].content}`);
}

if (history[9].content !== "message-14") {
  throw new Error(`Unexpected last message: ${history[9].content}`);
}

clearConversation(id);

if (getConversationHistory(id).length !== 0) {
  throw new Error("Conversation was not cleared");
}

console.log("All memory tests passed.");