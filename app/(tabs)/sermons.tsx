import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { SpiritualCard } from '@/components/SpiritualCard';
import { Play, Headphones, Clock, Calendar, Filter, Search } from 'lucide-react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedFont } from '@/utils/fonts';
import { LanguageToggle } from '@/components/LanguageToggle';

export default function SermonsScreen() {
  const { t } = useLanguage();
  const { getFontFamily, getTitleFont } = useLocalizedFont();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Recent', 'Faith', 'Prayer', 'Family', 'Worship'];

  const sermons = [
    {
      id: 1,
      title: "Walking in Faith Through Trials",
      speaker: t('pastorFitsum'),
      duration: "45 min",
      date: "2024-01-15",
      category: "Faith",
      type: "video",
      views: 1250,
      thumbnail: "https://images.pexels.com/photos/8468867/pexels-photo-8468867.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 2,
      title: "The Power of Intercessory Prayer",
      speaker: t('pastorFitsum'),
      duration: "38 min",
      date: "2024-01-12",
      category: "Prayer",
      type: "audio",
      views: 892,
      thumbnail: "https://images.pexels.com/photos/8468868/pexels-photo-8468868.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 3,
      title: "Building Strong Christian Families",
      speaker: t('pastorMekonnen'),
      duration: "52 min",
      date: "2024-01-10",
      category: "Family",
      type: "video",
      views: 1567,
      thumbnail: "https://images.pexels.com/photos/8468985/pexels-photo-8468985.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 4,
      title: "Worship in Spirit and Truth",
      speaker: t('pastorMekonnen'),
      duration: "41 min",
      date: "2024-01-08",
      category: "Worship",
      type: "video",
      views: 2103,
      thumbnail: "https://images.pexels.com/photos/8468914/pexels-photo-8468914.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 5,
      title: "Finding Peace in God's Presence",
      speaker: t('pastorFitsum'),
      duration: "35 min",
      date: "2024-01-05",
      category: "Prayer",
      type: "audio",
      views: 743,
      thumbnail: "https://images.pexels.com/photos/8468942/pexels-photo-8468942.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
  ];

  const filteredSermons = selectedCategory === 'All' 
    ? sermons 
    : sermons.filter(sermon => sermon.category === selectedCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'All': return t('all');
      case 'Recent': return t('recent');
      case 'Faith': return t('faith');
      case 'Prayer': return t('prayer');
      case 'Family': return t('family');
      case 'Worship': return t('worship');
      default: return category;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={[styles.title, { fontFamily: getTitleFont('SemiBold') }]}>
              {t('sermonsTitle')}
            </Text>
            <Text style={[styles.subtitle, { fontFamily: getFontFamily('Regular') }]}>
              {t('sermonsSubtitle')}
            </Text>
          </View>
          <LanguageToggle />
        </View>

        {/* Search and Filter */}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.searchButton}>
            <Search size={20} color={Colors.muted} />
            <Text style={[styles.searchText, { fontFamily: getFontFamily('Regular') }]}>
              {t('searchSermons')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color={Colors.softGold} />
          </TouchableOpacity>
        </View>

        {/* Category Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScrollView}
        >
          <View style={styles.categoryContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryText,
                  { fontFamily: getFontFamily('Medium') },
                  selectedCategory === category && styles.categoryTextActive
                ]}>
                  {getCategoryText(category)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Featured Sermon */}
        <SpiritualCard style={styles.featuredCard}>
          <Text style={[styles.featuredLabel, { fontFamily: getFontFamily('SemiBold') }]}>
            {t('featuredThisWeek')}
          </Text>
          <Image 
            source={{ uri: sermons[0].thumbnail }} 
            style={styles.featuredImage}
          />
          <View style={styles.featuredOverlay}>
            <TouchableOpacity 
              style={styles.playButton}
              onPress={() => router.push('/sermon-detail')}
            >
              <Play size={24} color={Colors.warmWhite} fill={Colors.warmWhite} />
            </TouchableOpacity>
          </View>
          <View style={styles.featuredInfo}>
            <Text style={[styles.featuredTitle, { fontFamily: getFontFamily('SemiBold') }]}>
              {sermons[0].title}
            </Text>
            <Text style={[styles.featuredSpeaker, { fontFamily: getFontFamily('Regular') }]}>
              {sermons[0].speaker}
            </Text>
            <View style={styles.featuredMeta}>
              <Clock size={14} color={Colors.muted} />
              <Text style={[styles.featuredDuration, { fontFamily: getFontFamily('Regular') }]}>
                {sermons[0].duration}
              </Text>
              <Text style={[styles.featuredViews, { fontFamily: getFontFamily('Regular') }]}>
                {sermons[0].views} {t('views')}
              </Text>
            </View>
          </View>
        </SpiritualCard>

        {/* Sermon List */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontFamily: getFontFamily('SemiBold') }]}>
            {selectedCategory === 'All' ? t('allSermons') : `${getCategoryText(selectedCategory)} ${t('sermons')}`}
          </Text>
          
          {filteredSermons.map((sermon) => (
            <SpiritualCard 
              key={sermon.id} 
              onPress={() => router.push('/sermon-detail')}
              style={styles.sermonCard}
            >
              <View style={styles.sermonContent}>
                <View style={styles.sermonImageContainer}>
                  <Image source={{ uri: sermon.thumbnail }} style={styles.sermonImage} />
                  <View style={styles.sermonTypeIndicator}>
                    {sermon.type === 'video' ? (
                      <Play size={12} color={Colors.warmWhite} fill={Colors.warmWhite} />
                    ) : (
                      <Headphones size={12} color={Colors.warmWhite} />
                    )}
                  </View>
                </View>
                
                <View style={styles.sermonInfo}>
                  <Text style={[styles.sermonTitle, { fontFamily: getFontFamily('SemiBold') }]}>
                    {sermon.title}
                  </Text>
                  <Text style={[styles.sermonSpeaker, { fontFamily: getFontFamily('Regular') }]}>
                    {sermon.speaker}
                  </Text>
                  
                  <View style={styles.sermonMeta}>
                    <View style={styles.sermonMetaItem}>
                      <Clock size={12} color={Colors.muted} />
                      <Text style={[styles.sermonMetaText, { fontFamily: getFontFamily('Regular') }]}>
                        {sermon.duration}
                      </Text>
                    </View>
                    <View style={styles.sermonMetaItem}>
                      <Calendar size={12} color={Colors.muted} />
                      <Text style={[styles.sermonMetaText, { fontFamily: getFontFamily('Regular') }]}>
                        {formatDate(sermon.date)}
                      </Text>
                    </View>
                  </View>
                  
                  <Text style={[styles.sermonViews, { fontFamily: getFontFamily('Regular') }]}>
                    {sermon.views} {t('views')}
                  </Text>
                </View>
              </View>
            </SpiritualCard>
          ))}
        </View>

        {/* Load More Button */}
        <TouchableOpacity style={styles.loadMoreButton}>
          <Text style={[styles.loadMoreText, { fontFamily: getFontFamily('SemiBold') }]}>
            {t('loadMoreSermons')}
          </Text>
        </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 20,
  },
  headerContent: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 28,
    color: Colors.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.secondary,
  },
  controls: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.warmWhite,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.lightGold,
  },
  searchText: {
    fontSize: 14,
    color: Colors.muted,
    marginLeft: 12,
  },
  filterButton: {
    backgroundColor: Colors.warmWhite,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.lightGold,
  },
  categoryScrollView: {
    marginBottom: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingRight: 20,
  },
  categoryButton: {
    backgroundColor: Colors.warmWhite,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.lightGold,
  },
  categoryButtonActive: {
    backgroundColor: Colors.softGold,
    borderColor: Colors.softGold,
  },
  categoryText: {
    fontSize: 14,
    color: Colors.primary,
  },
  categoryTextActive: {
    color: Colors.warmWhite,
  },
  featuredCard: {
    marginBottom: 24,
    padding: 0,
    overflow: 'hidden',
  },
  featuredLabel: {
    fontSize: 14,
    color: Colors.softGold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 16,
  },
  featuredImage: {
    width: '100%',
    height: 200,
    borderRadius: 0,
  },
  featuredOverlay: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    bottom: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 30,
    padding: 16,
  },
  featuredInfo: {
    padding: 20,
  },
  featuredTitle: {
    fontSize: 18,
    color: Colors.primary,
    marginBottom: 4,
  },
  featuredSpeaker: {
    fontSize: 14,
    color: Colors.secondary,
    marginBottom: 12,
  },
  featuredMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredDuration: {
    fontSize: 12,
    color: Colors.muted,
    marginLeft: 6,
    marginRight: 16,
  },
  featuredViews: {
    fontSize: 12,
    color: Colors.muted,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    color: Colors.primary,
    marginBottom: 16,
  },
  sermonCard: {
    marginBottom: 12,
  },
  sermonContent: {
    flexDirection: 'row',
  },
  sermonImageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  sermonImage: {
    width: 100,
    height: 75,
    borderRadius: 8,
  },
  sermonTypeIndicator: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    padding: 4,
  },
  sermonInfo: {
    flex: 1,
  },
  sermonTitle: {
    fontSize: 15,
    color: Colors.primary,
    marginBottom: 4,
    lineHeight: 20,
  },
  sermonSpeaker: {
    fontSize: 13,
    color: Colors.secondary,
    marginBottom: 8,
  },
  sermonMeta: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  sermonMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  sermonMetaText: {
    fontSize: 11,
    color: Colors.muted,
    marginLeft: 4,
  },
  sermonViews: {
    fontSize: 11,
    color: Colors.muted,
  },
  loadMoreButton: {
    backgroundColor: Colors.warmWhite,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.lightGold,
  },
  loadMoreText: {
    fontSize: 14,
    color: Colors.primary,
  },
});