const STORAGE_KEYS = {
  BOT_TOKEN: "insta_boutique_bot_token",
  CHAT_ID: "insta_boutique_chat_id",
  ADMIN_USERNAME: "insta_boutique_admin_user"
};

export const getTelegramConfig = () => {
  return {
    botToken: localStorage.getItem(STORAGE_KEYS.BOT_TOKEN) || "",
    chatId: localStorage.getItem(STORAGE_KEYS.CHAT_ID) || "",
    adminUsername: localStorage.getItem(STORAGE_KEYS.ADMIN_USERNAME) || "admin"
  };
};

export const saveTelegramConfig = ({ botToken, chatId, adminUsername }) => {
  if (botToken !== undefined) localStorage.setItem(STORAGE_KEYS.BOT_TOKEN, botToken.trim());
  if (chatId !== undefined) localStorage.setItem(STORAGE_KEYS.CHAT_ID, chatId.trim());
  if (adminUsername !== undefined) localStorage.setItem(STORAGE_KEYS.ADMIN_USERNAME, adminUsername.trim().replace("@", ""));
};

/**
 * Sends a test message to verify Telegram bot setup
 */
export const testTelegramConnection = async () => {
  const { botToken, chatId } = getTelegramConfig();
  if (!botToken || !chatId) {
    return { success: false, error: "Bot Token va Chat ID to'liq kiritilishi shart!" };
  }

  const text = `✅ <b>storeUZ: Telegram Bot Muvaffaqiyatli Ulandi!</b>\n\nBu sinov xabari. Veb-saytdan tushgan buyurtmalar, fotosuratlar va ombor signallari ushbu chatga keladi.`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "HTML"
      })
    });

    const data = await response.json();
    if (!data.ok) {
      return { success: false, error: data.description || "Telegram API xatolik qaytardi" };
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message || "Ulanishda tarmoq xatoligi" };
  }
};

/**
 * Sends order details to Telegram Bot with Photo and formatted caption
 */
export const sendTelegramOrder = async (orderData) => {
  const { botToken, chatId, adminUsername } = getTelegramConfig();

  const isBuy = !orderData.isPreOrder;
  const title = isBuy 
    ? "🛍 <b>YANGI BUYURTMA (TEZKOR XARID - TOSHKENT OMBORI)</b>" 
    : "✈️ <b>YANGI ZAKAS (XALQARO AVIA-KARGO PRE-ORDER)</b>";

  const formattedPrice = new Intl.NumberFormat("uz-UZ").format(orderData.totalPrice);
  const now = new Date().toLocaleString("uz-UZ");

  const captionText = 
`${title}
━━━━━━━━━━━━━━━━━━━━━━
👕 <b>Libos:</b> ${orderData.productName}
🏷 <b>Brend:</b> ${orderData.productBrand || 'LUXURY'} (${orderData.refCode || 'ORIGINAL'})
🌍 <b>Kelib chiqishi:</b> ${orderData.origin || 'Import'}
💰 <b>Jami narxi:</b> ${formattedPrice} so'm
📏 <b>Tanlangan o'lcham:</b> <b>${orderData.selectedSize}</b>
🎨 <b>Tanlangan rang:</b> <b>${orderData.selectedColor}</b>
🔢 <b>Miqdori:</b> ${orderData.quantity || 1} dona
${orderData.isPreOrder ? `⏳ <b>Kutilayotgan reys:</b> ${orderData.preOrderDays || "5-7 kun"}\n` : ""}━━━━━━━━━━━━━━━━━━━━━━
👤 <b>Mijoz:</b> ${orderData.clientName}
📞 <b>Telefon:</b> ${orderData.clientPhone}
✈️ <b>Telegram:</b> ${orderData.telegramUsername || "Ko'rsatilmadi"}
📍 <b>Manzil / Izoh:</b> ${orderData.address || "Toshkent shahri"}
⏰ <b>Vaqt:</b> ${now}
━━━━━━━━━━━━━━━━━━━━━━
<i>storeUZ • Eksklyuziv Butik Tizimi</i>`;

  let sentSuccessfully = false;

  if (botToken && chatId) {
    try {
      const isHttpUrl = orderData.productImage && 
        (orderData.productImage.startsWith("http://") || orderData.productImage.startsWith("https://"));

      if (isHttpUrl) {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            photo: orderData.productImage,
            caption: captionText,
            parse_mode: "HTML"
          })
        });
        const resData = await response.json();
        if (resData.ok) {
          sentSuccessfully = true;
        }
      }

      if (!sentSuccessfully) {
        const textResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: captionText,
            parse_mode: "HTML"
          })
        });
        const textData = await textResponse.json();
        if (textData.ok) {
          sentSuccessfully = true;
        }
      }
    } catch (err) {
      console.error("Telegram order sending error:", err);
    }
  }

  return {
    sentToBot: sentSuccessfully,
    messageText: captionText.replace(/<[^>]*>/g, "")
  };
};

export const generateDirectTelegramUrl = (orderData) => {
  const { adminUsername } = getTelegramConfig();
  const cleanAdmin = adminUsername ? adminUsername.replace("@", "") : "telegram";
  
  if (!orderData) return `https://t.me/${cleanAdmin}`;

  const message = `Salom! Men saytdan "${orderData.productName}" (${orderData.selectedSize}, ${orderData.selectedColor}) buyurtma qilmoqchiman. Telefonim: ${orderData.clientPhone}`;
  return `https://t.me/${cleanAdmin}?text=${encodeURIComponent(message)}`;
};

/**
 * Sends urgent notification to Admin Bot when product stock drops to 0
 */
export const sendOutOfStockAlert = async (product) => {
  const { botToken, chatId } = getTelegramConfig();
  if (!botToken || !chatId) return;

  const text = 
`⚠️ <b>DIQQAT: MAHSULOT OMBORDA TUGADI!</b>
━━━━━━━━━━━━━━━━━━━━━━
👕 <b>Kiyim:</b> ${product.name}
🏷 <b>Brend:</b> ${product.brand}
🌍 <b>Davlat:</b> ${product.origin}
📦 <b>Qoldiq:</b> 0 dona

🔴 <b>Holati:</b> Saytda oddiy xaridorlarga ko'rinmasligi uchun <b>AVTOMATIK YASHIRILDI</b>.
━━━━━━━━━━━━━━━━━━━━━━
<i>Iltimos, Admin panelga kirib sonini yangilang (Restock), zakasga o'tkazing yoki o'chirib yuboring.</i>`;

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "HTML"
      })
    });
  } catch (err) {
    console.error("Out of stock alert error:", err);
  }
};
