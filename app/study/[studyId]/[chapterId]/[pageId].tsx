import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { SpiritualCard } from '@/components/SpiritualCard';
import { ArrowLeft, ArrowRight, ChevronLeft, BookOpen, CircleCheck as CheckCircle } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedFont } from '@/utils/fonts';
import { supabase } from '@/utils/supabase';

interface StudyContent {
  title: string;
  content: string;
  totalPages: number;
}

export default function StudyPageScreen() {
  const { studyId, chapterId, pageId } = useLocalSearchParams();
  const { t } = useLanguage();
  const { getFontFamily, getTitleFont } = useLocalizedFont();
  
  const [studyContent, setStudyContent] = useState<StudyContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentProgress, setCurrentProgress] = useState(0);

  // Mock study content - in production this would come from Supabase
  const getStudyContent = (studyId: string, chapterId: string, pageId: string): StudyContent => {
    const studies = {
      '1': {
        title: 'Foundations of Faith',
        chapters: {
          '1': {
            title: 'Understanding God\'s Love',
            pages: {
              '1': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
              '2': 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.\n\nNeque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.\n\nUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.',
              '3': 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.\n\nSimilique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.\n\nNam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.'
            }
          }
        }
      }
    };

    const study = studies[studyId as keyof typeof studies];
    const chapter = study?.chapters[chapterId as keyof typeof study.chapters];
    const content = chapter?.pages[pageId as keyof typeof chapter.pages];

    return {
      title: `${study?.title} - Chapter ${chapterId}: ${chapter?.title}`,
      content: content || 'Content not found',
      totalPages: Object.keys(chapter?.pages || {}).length
    };
  };

  useEffect(() => {
    loadStudyContent();
    loadProgress();
  }, [studyId, chapterId, pageId]);

  const loadStudyContent = () => {
    const content = getStudyContent(studyId as string, chapterId as string, pageId as string);
    setStudyContent(content);
    setIsLoading(false);
  };

  const loadProgress = async () => {
    try {
      // In production, load from Supabase user_study_progress
      const { data, error } = await supabase
        .from('user_study_progress')
        .select('*')
        .eq('study_id', studyId)
        .eq('chapter_id', chapterId)
        .single();

      if (data) {
        setCurrentProgress(data.pages_completed || 0);
      }
    } catch (error) {
      console.log('Progress loading error:', error);
    }
  };

  const updateProgress = async () => {
    try {
      const newProgress = Math.max(currentProgress, parseInt(pageId as string));
      
      // Update Supabase progress
      const { error } = await supabase
        .from('user_study_progress')
        .upsert({
          study_id: parseInt(studyId as string),
          chapter_id: parseInt(chapterId as string),
          pages_completed: newProgress,
          is_chapter_complete: newProgress >= (studyContent?.totalPages || 0),
          updated_at: new Date().toISOString()
        });

      if (!error) {
        setCurrentProgress(newProgress);
        
        // Check if chapter is complete
        if (newProgress >= (studyContent?.totalPages || 0)) {
          Alert.alert(
            t('chapterComplete'),
            t('chapterCompleteMessage'),
            [{ text: t('ok'), onPress: () => router.back() }]
          );
        }
      }
    } catch (error) {
      console.log('Progress update error:', error);
    }
  };

  const navigatePage = (direction: 'next' | 'prev') => {
    const currentPage = parseInt(pageId as string);
    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
    
    if (direction === 'next') {
      updateProgress();
    }
    
    if (newPage >= 1 && newPage <= (studyContent?.totalPages || 0)) {
      router.push(`/study/${studyId}/${chapterId}/${newPage}`);
    }
  };

  if (isLoading || !studyContent) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { fontFamily: getFontFamily('Regular') }]}>
            {t('loading')}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentPage = parseInt(pageId as string);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage >= studyContent.totalPages;
  const isPageRead = currentProgress >= currentPage;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={Colors.primary} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={[styles.title, { fontFamily: getTitleFont('SemiBold') }]}>
              {studyContent.title}
            </Text>
            <View style={styles.progressInfo}>
              <BookOpen size={16} color={Colors.softGold} />
              <Text style={[styles.progressText, { fontFamily: getFontFamily('Medium') }]}>
                {t('page')} {currentPage} {t('of')} {studyContent.totalPages}
              </Text>
              {isPageRead && (
                <CheckCircle size={16} color={Colors.success} />
              )}
            </View>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${(currentProgress / studyContent.totalPages) * 100}%` }
              ]} 
            />
          </View>
          <Text style={[styles.progressLabel, { fontFamily: getFontFamily('Regular') }]}>
            {Math.round((currentProgress / studyContent.totalPages) * 100)}% {t('complete')}
          </Text>
        </View>

        {/* Content */}
        <SpiritualCard style={styles.contentCard}>
          <Text style={[styles.content, { fontFamily: getFontFamily('Regular') }]}>
            {studyContent.content}
          </Text>
        </SpiritualCard>

        {/* Navigation */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity 
            style={[styles.navButton, isFirstPage && styles.navButtonDisabled]}
            onPress={() => navigatePage('prev')}
            disabled={isFirstPage}
          >
            <ChevronLeft size={20} color={isFirstPage ? Colors.muted : Colors.softGold} />
            <Text style={[
              styles.navButtonText, 
              { fontFamily: getFontFamily('SemiBold') },
              isFirstPage && styles.navButtonTextDisabled
            ]}>
              {t('previous')}
            </Text>
          </TouchableOpacity>

          <View style={styles.pageIndicator}>
            <Text style={[styles.pageNumber, { fontFamily: getFontFamily('Bold') }]}>
              {currentPage}
            </Text>
          </View>

          <TouchableOpacity 
            style={[styles.navButton, isLastPage && styles.navButtonDisabled]}
            onPress={() => navigatePage('next')}
            disabled={isLastPage}
          >
            <Text style={[
              styles.navButtonText, 
              { fontFamily: getFontFamily('SemiBold') },
              isLastPage && styles.navButtonTextDisabled
            ]}>
              {t('next')}
            </Text>
            <ArrowRight size={20} color={isLastPage ? Colors.muted : Colors.softGold} />
          </TouchableOpacity>
        </View>

        {/* Chapter Summary (if last page) */}
        {isLastPage && (
          <SpiritualCard style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <CheckCircle size={24} color={Colors.success} />
              <Text style={[styles.summaryTitle, { fontFamily: getFontFamily('SemiBold') }]}>
                {t('chapterSummary')}
              </Text>
            </View>
            <Text style={[styles.summaryText, { fontFamily: getFontFamily('Regular') }]}>
              {t('chapterSummaryText')}
            </Text>
            <TouchableOpacity 
              style={styles.completeButton}
              onPress={updateProgress}
            >
              <Text style={[styles.completeButtonText, { fontFamily: getFontFamily('SemiBold') }]}>
                {t('markChapterComplete')}
              </Text>
            </TouchableOpacity>
          </SpiritualCard>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: Colors.secondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  backButton: {
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: Colors.primary,
    marginBottom: 8,
  },
  progressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    color: Colors.secondary,
    marginLeft: 6,
    marginRight: 8,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.lightGold,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.softGold,
    borderRadius: 4,
  },
  progressLabel: {
    fontSize: 12,
    color: Colors.secondary,
    textAlign: 'center',
  },
  contentCard: {
    marginBottom: 24,
    paddingVertical: 24,
  },
  content: {
    fontSize: 16,
    color: Colors.primary,
    lineHeight: 24,
    textAlign: 'justify',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.warmWhite,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.lightGold,
    flex: 0.35,
  },
  navButtonDisabled: {
    backgroundColor: Colors.softGray,
    borderColor: Colors.mediumGray,
  },
  navButtonText: {
    fontSize: 14,
    color: Colors.primary,
  },
  navButtonTextDisabled: {
    color: Colors.muted,
  },
  pageIndicator: {
    backgroundColor: Colors.softGold,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageNumber: {
    fontSize: 16,
    color: Colors.warmWhite,
  },
  summaryCard: {
    backgroundColor: Colors.lightGold,
    marginBottom: 20,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 18,
    color: Colors.primary,
    marginLeft: 8,
  },
  summaryText: {
    fontSize: 14,
    color: Colors.secondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  completeButton: {
    backgroundColor: Colors.success,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  completeButtonText: {
    fontSize: 14,
    color: Colors.warmWhite,
  },
});