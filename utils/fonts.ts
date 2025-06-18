import { useLanguage } from '@/contexts/LanguageContext';

export function useLocalizedFont() {
  const { language } = useLanguage();
  
  const getFontFamily = (weight: 'Regular' | 'Medium' | 'SemiBold' | 'Bold' = 'Regular') => {
    if (language === 'am') {
      return `NotoSansEthiopic-${weight}`;
    }
    return `Inter-${weight}`;
  };

  const getTitleFont = (weight: 'Regular' | 'SemiBold' = 'SemiBold') => {
    if (language === 'am') {
      return `NotoSansEthiopic-${weight === 'SemiBold' ? 'SemiBold' : 'Regular'}`;
    }
    return `Crimson-${weight}`;
  };

  return {
    getFontFamily,
    getTitleFont,
  };
}