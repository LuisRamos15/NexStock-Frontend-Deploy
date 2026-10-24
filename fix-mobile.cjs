const fs = require("fs")

const chatPath = "src/pages/Chat.tsx"

let chat = fs.readFileSync(chatPath, "utf8")

/* 1. Agregar ArrowLeft al import */
if (!chat.includes("ArrowLeft")) {
  chat = chat.replace(
    /import\s*\{\s*MessageCircle,\s*Search,\s*Send,\s*Plus,\s*Users\s*\}\s*from\s*"lucide-react"/,
    'import { MessageCircle, Search, Send, Plus, Users, ArrowLeft } from "lucide-react"'
  )
}

/* 2. Identificar el contenedor principal del chat */
if (!chat.includes('className="chat-layout ')) {
  chat = chat.replace(
    'className="grid grid-cols-[320px_1fr] gap-5 h-[calc(100vh-170px)]"',
    'className="chat-layout grid grid-cols-[320px_1fr] gap-5 h-[calc(100vh-170px)]"'
  )
}

/* 3. Identificar lista y conversación */
if (!chat.includes("chat-list-panel")) {
  let numeroSeccion = 0

  chat = chat.replace(
    /className="chat-card rounded-\[28px\] border flex flex-col overflow-hidden"/g,
    (texto) => {
      numeroSeccion++

      if (numeroSeccion === 1) {
        return 'className="chat-list-panel chat-card rounded-[28px] border flex flex-col overflow-hidden"'
      }

      if (numeroSeccion === 2) {
        return 'className="chat-conversation-panel chat-card rounded-[28px] border flex flex-col overflow-hidden"'
      }

      return texto
    }
  )
}

/* 4. Agregar botón VOLVER a las dos cabeceras:
      conversación individual y grupo */
if (!chat.includes("mobile-chat-back")) {
  let cabeceraNumero = 0

  chat = chat.replace(
    /<div className="px-6 py-5 border-b chat-border">/g,
    (texto) => {
      cabeceraNumero++

      if (cabeceraNumero <= 2) {
        return `<div className="px-6 py-5 border-b chat-border relative pl-[60px] md:pl-6">
                <button
                  type="button"
                  onClick={cerrarChatAbierto}
                  className="mobile-chat-back md:hidden absolute left-3 top-1/2 -translate-y-1/2"
                  aria-label="Volver"
                >
                  <ArrowLeft size={20} />
                </button>`
      }

      return texto
    }
  )
}

/* 5. Validaciones */
if (!chat.includes("chat-layout")) {
  throw new Error("No se pudo configurar chat-layout")
}

if (!chat.includes("chat-list-panel")) {
  throw new Error("No se pudo identificar el panel de contactos")
}

if (!chat.includes("chat-conversation-panel")) {
  throw new Error("No se pudo identificar el panel de conversación")
}

if (!chat.includes("mobile-chat-back")) {
  throw new Error("No se pudo crear el botón Volver")
}

fs.writeFileSync(chatPath, chat, "utf8")

console.log("✓ Chat móvil corregido correctamente")
console.log("✓ Lista de contactos configurada")
console.log("✓ Conversación configurada")
console.log("✓ Botón Volver configurado")
console.log("")
console.log("Ahora ejecuta: npm run build")