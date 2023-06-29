export default function createMessage(m) {
    const stamp = new Date(m.data.timeStamp).toLocaleDateString();

    const time = new Date(m.data.timeStamp).toLocaleTimeString();

    const message = `
        <div class="message">
        <div class="message-header">
              <span class="username">${m.data.username}</span>
              <span>${stamp} ${time}</span>
            </div>
            <p>${m.data.text}</p>
            
        <div>
    `;

    return message;
}
