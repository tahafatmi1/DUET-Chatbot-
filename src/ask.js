/** Ask the chatbot a question from anywhere on the page and scroll to the chat. */
export function askAssistant(question) {
  document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  window.dispatchEvent(new CustomEvent('duet:ask', { detail: question }));
}
