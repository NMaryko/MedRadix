'use client';

import { useState } from 'react';
import {
  Activity,
  BookOpen,
  FileText,
  Mic,
  GraduationCap,
  Calculator,
  Pill,
  Stethoscope,
  Folder,
} from 'lucide-react';

const SPECIALTIES: string[] = [
  'Все',
  'Акушерство и гинекология',
  'Аллергология и иммунология',
  'Анестезиология и реаниматология',
  'Гастроэнтерология',
  'Гематология',
  'Гериатрия',
  'Дерматология',
  'Инфекционные болезни',
  'Кардиология',
  'Неврология',
  'Нефрология',
  'Онкология',
  'Офтальмология',
  'Педиатрия',
  'Пульмонология',
  'Психиатрия',
  'Ревматология',
  'Терапия',
  'Травматология и ортопедия',
  'Урология',
  'Хирургия',
  'Эндокринология',
];

const NEWS = [
  {
    id: 1,
    title:
      'Новые рекомендации ESC по ведению пациентов с фибрилляцией предсердий',
    href: '#',
  },
  {
    id: 2,
    title:
      'FDA одобрило новый препарат для лечения сердечной недостаточности',
    href: '#',
  },
  {
    id: 3,
    title:
      'Исследование The Lancet: связь между сном и риском деменции',
    href: '#',
  },
  {
    id: 4,
    title:
      'JAMA: Влияние витамина D на иммунный ответ при COVID-19',
    href: '#',
  },
  {
    id: 5,
    title:
      'Обновлены гайдлайны ADA по лечению сахарного диабета 2 типа',
    href: '#',
  },
];

type SectionItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  variant: 'news' | 'default';
};

const SECTIONS: SectionItem[] = [
  {
    id: 'news',
    title: 'Новое',
    description:
      'Обновления по версиям гайдлайнов, свежим исследованиям и материалам на MedRadix. Новые материалы помечены янтарной линией и остаются в разделе «Новое» 14 дней. Новости по гайдам дополнительно сохраняются в этом разделе до 60 дней.',
    href: '/news',
    icon: Activity,
    variant: 'news',
  },
  {
    id: 'guides',
    title: 'Гайды',
    description:
      'Европейские клинические рекомендации, сопоставленные с американскими гайдами, с регулярным обновлением версий и ключевых изменений.',
    href: '/guides',
    icon: BookOpen,
    variant: 'default',
  },
  {
    id: 'articles',
    title: 'Статьи',
    description:
      'Самые свежие исследования из ключевых медицинских журналов мира, краткие выводы, цифры и ссылки на оригиналы.',
    href: '/articles',
    icon: FileText,
    variant: 'default',
  },
  {
    id: 'experts',
    title: 'Голос эксперта',
    description:
      'Комментарии ведущих специалистов по ключевым исследованиям и рекомендациям, со ссылками на оригинальные источники.',
    href: '/experts',
    icon: Mic,
    variant: 'default',
  },
  {
    id: 'courses',
    title: 'Курсы',
    description:
      'Собраны бесплатные российские и зарубежные программы, дающие международные баллы (CME/НМО).',
    href: '/courses',
    icon: GraduationCap,
    variant: 'default',
  },
  {
    id: 'calculators',
    title: 'Калькуляторы',
    description:
      'Достаточно один раз ввести данные, чтобы получить параллельные расчёты по европейским и американским стандартам.',
    href: '/calculators',
    icon: Calculator,
    variant: 'default',
  },
  {
    id: 'drugs',
    title: 'Лекарства',
    description:
      'Инструкции лекарств с акцентом на применение в клинических рекомендациях и взаимодействия.',
    href: '/drugs',
    icon: Pill,
    variant: 'default',
  },
  {
    id: 'nurses',
    title: 'Медсестрам',
    description:
      'Раздел с редкими обучающими материалами, где можно получить бесплатные кредиты за прохождение курсов.',
    href: '/nurses',
    icon: Stethoscope,
    variant: 'default',
  },
  {
    id: 'folders',
    title: 'Папки',
    description:
      'Сохранение сертификатов и файлов в личном кабинете с автоматическим подсчётом баллов (CME/НМО).',
    href: '/folders',
    icon: Folder,
    variant: 'default',
  },
];

export default function HomePage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('Все');

  const filteredNews = NEWS; // пока без реальной фильтрации

  return (
    <main className="bg-[#fcfcee] min-h-screen">
      {/* Компактный блок афоризма сверху */}
      <section className="border-b border-gray-200">
        <div className="max-w-[1360px] mx-auto px-4 pt-4 pb-4">
          {/* ТРИ КОЛОНКИ: чип слева, афоризм по центру, фильтр справа */}
          <div className="flex items-center">
            {/* Левая колонка: чип */}
            <div className="flex-1 flex justify-start">
              <button className="px-5 py-1.5 text-xs font-medium rounded-full border border-[#b6b6c0] bg-white shadow-sm">
                Афоризм месяца
              </button>
            </div>

            {/* Центральная колонка: афоризм */}
            <div className="flex-shrink-0 text-center">
              <h2 className="text-2xl md:text-3xl font-semibold italic tracking-wide">
                Mens sana in corpore sano
              </h2>
              <p className="mt-1.5 text-sm text-[#3b342d]">
                В здоровом теле — здоровый дух (Ювенал)
              </p>
            </div>

            {/* Правая колонка: фильтр специальности */}
            <div className="flex-1 flex justify-end">
              <div className="flex flex-col items-end gap-1">
                <span className="text-[11px] uppercase tracking-[0.18em] text-[#9c978f]">
                  Специальность
                </span>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="min-w-[190px] rounded-full border border-[#d3cec4] bg-white px-4 py-1.5 text-sm text-[#3b342d] shadow-sm focus:outline-none focus:border-[#015d52]"
                >
                  {SPECIALTIES.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Список новостей с одной общей «молнией» слева */}
      <section className="relative max-w-[1360px] mx-auto px-4 pt-8 pb-16">
        {/* Жёлтая линия от нижней до верхней новости */}
        <div className="absolute left-10 top-2 bottom-2 flex items-stretch pointer-events-none">
          <div className="w-[2px] bg-gradient-to-b from-[#facc15]/0 via-[#facc15] to-[#facc15]/0 animate-pulse" />
        </div>

        <ul className="space-y-4 pl-16">
          {filteredNews.map((item) => (
            <li key={item.id} className="flex items-start gap-4">
              {/* Иконка-кружок */}
              <div className="flex h-7 w-7 flex-none items-center justify-center rounded-full border border-[#3b3640] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.03)]">
                <span className="h-4 w-[2px] bg-[#facc15] rounded-full" />
              </div>

              {/* Кликабельная новость, шрифт чуть крупнее */}
              <a
                href={item.href}
                className="text-[16px] md:text-[17px] leading-relaxed text-[#3b342d] hover:text-[#015d52] transition-colors"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ШАХМАТКА РАЗДЕЛОВ */}
      <section className="max-w-[1360px] mx-auto px-4 pt-6 pb-20">
        <div className="space-y-10 md:space-y-12">
          {SECTIONS.map((item, index) => {
            const isRight = index % 2 === 0; // 1,3,5,... справа; 2,4,6,... слева
            const Icon = item.icon;
            const isNews = item.variant === 'news';

            const iconCircleClasses = isNews
              ? 'bg-[#f59e0b]'
              : 'bg-[#015d52]';

            const titleClasses = isNews
              ? 'text-[#e59e0b]'
              : 'text-[#3b342d]';

            return (
              <div
                key={item.id}
                className={`flex ${isRight ? 'justify-end' : 'justify-start'}`}
              >
                <a
                  href={item.href}
                  className={`flex items-start gap-4 md:gap-6 group ${
                    isRight ? 'text-right' : 'text-left'
                  }`}
                >
                  {/* Для левого столбца: иконка слева, текст справа.
                      Для правого столбца: текст слева, иконка справа. */}
                  {!isRight && (
                    <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full shadow-md bg-[#013b35]/10">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${iconCircleClasses}`}
                      >
                        <Icon size={20} className="text-white" />
                      </div>
                    </div>
                  )}

                  <div className="max-w-md md:max-w-lg">
                    <h3
                      className={`text-lg md:text-xl font-semibold ${titleClasses} group-hover:underline decoration-[#015d52]/60`}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[15px] md:text-[16px] leading-relaxed text-[#3b342d]">
                      {item.description}
                    </p>
                  </div>

                  {isRight && (
                    <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full shadow-md bg-[#013b35]/10">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${iconCircleClasses}`}
                      >
                        <Icon size={20} className="text-white" />
                      </div>
                    </div>
                  )}
                </a>
              </div>
            );
          })}
        </div>

        {/* Кнопка доступа и email */}
        <div className="mt-16 text-center">
          <button className="inline-flex items-center justify-center rounded-full bg-[#015d52] px-8 py-3 text-sm md:text-base font-semibold text-white shadow-md hover:bg-[#01463d] transition-colors">
            Получить полный доступ MedRadix
          </button>
          <p className="mt-4 text-sm md:text-[15px] text-[#3b342d]">
            для врачей — от $12/мес, для медсестер — от $7/мес
          </p>
          <p className="mt-10 text-sm md:text-[15px] text-[#3b342d]">
            support@medradix.info
          </p>
        </div>
      </section>
    </main>
  );
}


