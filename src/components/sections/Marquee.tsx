const items = [
  '🍰 Birthday Cakes', '💍 Wedding Cakes', '🍫 Chocolate Dreams', '🧁 Cupcakes',
  '🍓 Fresh Ingredients', '✨ Custom Designs', '🎂 Free Delivery*', '⭐ 4.9 Rated',
  '🎉 Celebrations', '🌸 Floral Cakes', '🏆 Award Winning', '💝 Made with Love',
];

export default function Marquee() {
  return (
    <div
      className="py-5 overflow-hidden border-y-2 border-amber-200/60"
      style={{ background: 'linear-gradient(to right, #FDF6EC, #F9D5E5, #FDF6EC)' }}
      aria-label="Featured highlights"
      aria-hidden="true"
    >
      <div className="animate-marquee flex gap-8 whitespace-nowrap select-none">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-amber-700 font-semibold text-sm flex items-center gap-2">
            {item}
            <span className="text-amber-300 mx-2">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
