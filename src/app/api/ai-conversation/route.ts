import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/api-helpers';
import { AI_CONVERSATION_PROMPTS } from '@/lib/mock-data';
import { pickRandom } from '@/lib/utils';

// Mock AI Conversation - thay bằng OpenAI/Claude API sau
async function generateAIReply(messages: { role: string; content: string }[], aiRole: string): Promise<{ en: string; vi: string }> {
  const prompts = AI_CONVERSATION_PROMPTS[aiRole];
  const lastUserMsg = messages[messages.length - 1]?.content || '';

  // Mock responses theo vai
  const mockReplies: Record<string, { en: string; vi: string }[]> = {
    friend: [
      { en: "That's cool! Tell me more about it.", vi: 'Nghe hay đấy! Kể cho mình nghe thêm đi.' },
      { en: "Oh really? I didn't know that!", vi: 'Ồ thật á? Mình không biết điều đó luôn!' },
      { en: "Sounds fun! We should hang out sometime.", vi: 'Nghe vui đó! Chúng ta nên đi chơi cùng nhau một lần.' }
    ],
    teacher: [
      { en: "Good effort! Try to use more varied vocabulary.", vi: 'Cố gắng tốt! Hãy thử dùng từ vựng đa dạng hơn.' },
      { en: "I see what you mean. Can you explain it differently?", vi: 'Mình hiểu ý bạn. Bạn có thể giải thích khác không?' },
      { en: "Excellent sentence structure! Now let's practice more.", vi: 'Cấu trúc câu tuyệt vời! Bây giờ hãy luyện tập thêm.' }
    ],
    colleague: [
      { en: "Got it. Let me check the schedule.", vi: 'Hiểu rồi. Để mình kiểm tra lịch trình.' },
      { en: "Thanks for the update. I'll follow up.", vi: 'Cảm ơn bạn đã cập nhật. Mình sẽ theo dõi tiếp.' },
      { en: "Sounds good. Let me know if anything changes.", vi: 'Nghe ổn đó. Báo mình nếu có gì thay đổi nhé.' }
    ],
    recruiter: [
      { en: "Interesting. Can you tell me about a challenge you overcame?", vi: 'Thú vị. Bạn có thể kể về một thử thách bạn đã vượt qua không?' },
      { en: "Why do you want this position?", vi: 'Tại sao bạn muốn vị trí này?' },
      { en: "What are your salary expectations?", vi: 'Mức lương bạn mong muốn là bao nhiêu?' }
    ],
    customer: [
      { en: "Do you have this in a different size?", vi: 'Cái này có size khác không?' },
      { en: "How much does this cost?", vi: 'Cái này giá bao nhiêu?' },
      { en: "Can I get a refund?", vi: 'Tôi có thể được hoàn tiền không?' }
    ],
    restaurant: [
      { en: "Would you like to start with something to drink?", vi: 'Bạn muốn gọi đồ uống trước không?' },
      { en: "Today's special is grilled salmon.", vi: 'Món đặc biệt hôm nay là cá hồi nướng.' },
      { en: "How would you like your steak cooked?", vi: 'Bạn muốn steak chín mức nào?' }
    ],
    airport: [
      { en: "Please place your luggage on the scale.", vi: 'Vui lòng đặt hành lý lên cân.' },
      { en: "Your gate is B12. Boarding starts at 3 PM.", vi: 'Cổng của bạn là B12. Lên máy bay lúc 3 giờ chiều.' },
      { en: "Please show me your boarding pass.", vi: 'Vui lòng cho tôi xem thẻ lên máy bay.' }
    ]
  };

  const replies = mockReplies[aiRole] || mockReplies.friend;
  return pickRandom(replies);
}

export async function POST(req: NextRequest) {
  const { user, error } = await requireAuth();
  if (error) return error;

  try {
    const { role, topic, userMessage, conversationId, messages } = await req.json();

    if (!role || !userMessage) {
      return NextResponse.json({ error: 'Thiếu thông tin' }, { status: 400 });
    }

    const aiReply = await generateAIReply(messages || [], role);

    // Lưu hoặc tạo conversation
    const newMessages = [
      ...(messages || []),
      { role: 'user', content: userMessage },
      { role: 'assistant', content: aiReply.en, vi: aiReply.vi }
    ];

    if (conversationId) {
      await prisma.aiConversation.update({
        where: { id: conversationId, userId: user!.id },
        data: { messages: JSON.stringify(newMessages), updatedAt: new Date() }
      });
    } else {
      const conv = await prisma.aiConversation.create({
        data: {
          userId: user!.id,
          role,
          topic: topic || 'free',
          messages: JSON.stringify(newMessages)
        }
      });
      return NextResponse.json({ reply: aiReply, conversationId: conv.id });
    }

    // Cộng XP
    await prisma.user.update({ where: { id: user!.id }, data: { xp: { increment: 5 } } });

    return NextResponse.json({ reply: aiReply });
  } catch (e) {
    console.error('AI Conv error:', e);
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 });
  }
}