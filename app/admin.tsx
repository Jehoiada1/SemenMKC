import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { SpiritualCard } from '@/components/SpiritualCard';
import { ArrowLeft, Upload, FileText, Play, Users, Settings, Calendar, BarChart } from 'lucide-react-native';
import { router } from 'expo-router';
import { useState } from 'react';

export default function AdminScreen() {
  const [selectedTab, setSelectedTab] = useState('overview');

  const adminStats = {
    totalUsers: 324,
    activeStudies: 15,
    totalSermons: 89,
    totalDoctrines: 12,
    thisWeekUploads: 3,
    pendingReviews: 5,
  };

  const recentUploads = [
    { id: 1, type: 'sermon', title: 'Walking in Faith', date: '2024-01-15', status: 'published' },
    { id: 2, type: 'doctrine', title: 'Salvation Through Grace', date: '2024-01-14', status: 'pending' },
    { id: 3, type: 'study', title: 'Psalms Study Guide', date: '2024-01-13', status: 'published' },
  ];

  const renderUploadSection = () => (
    <View style={styles.uploadSection}>
      <Text style={styles.sectionTitle}>Content Upload</Text>
      
      {/* Upload Cards */}
      <View style={styles.uploadGrid}>
        <SpiritualCard style={styles.uploadCard}>
          <Upload size={32} color={Colors.softGold} />
          <Text style={styles.uploadTitle}>Upload Sermon</Text>
          <Text style={styles.uploadDescription}>Add new audio or video sermons</Text>
          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Choose Files</Text>
          </TouchableOpacity>
        </SpiritualCard>

        <SpiritualCard style={styles.uploadCard}>
          <FileText size={32} color={Colors.softGold} />
          <Text style={styles.uploadTitle}>Upload Doctrine</Text>
          <Text style={styles.uploadDescription}>Add PDF doctrine documents</Text>
          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Choose Files</Text>
          </TouchableOpacity>
        </SpiritualCard>

        <SpiritualCard style={styles.uploadCard}>
          <Users size={32} color={Colors.softGold} />
          <Text style={styles.uploadTitle}>Bible Study</Text>
          <Text style={styles.uploadDescription}>Create new study materials</Text>
          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Create Study</Text>
          </TouchableOpacity>
        </SpiritualCard>
      </View>

      {/* Quick Upload Form */}
      <SpiritualCard style={styles.quickUploadCard}>
        <Text style={styles.quickUploadTitle}>Quick Sermon Upload</Text>
        
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Title</Text>
          <TextInput 
            style={styles.formInput}
            placeholder="Enter sermon title"
            placeholderTextColor={Colors.muted}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Speaker</Text>
          <TextInput 
            style={styles.formInput}
            placeholder="Enter speaker name"
            placeholderTextColor={Colors.muted}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Category</Text>
          <View style={styles.categoryButtons}>
            <TouchableOpacity style={styles.categoryButton}>
              <Text style={styles.categoryButtonText}>Faith</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Text style={styles.categoryButtonText}>Prayer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Text style={styles.categoryButtonText}>Family</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton}>
          <Upload size={16} color={Colors.warmWhite} />
          <Text style={styles.submitButtonText}>Upload & Publish</Text>
        </TouchableOpacity>
      </SpiritualCard>
    </View>
  );

  const renderOverviewSection = () => (
    <View style={styles.overviewSection}>
      <Text style={styles.sectionTitle}>Admin Overview</Text>
      
      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <SpiritualCard style={styles.statCard}>
          <Users size={24} color={Colors.softGold} />
          <Text style={styles.statNumber}>{adminStats.totalUsers}</Text>
          <Text style={styles.statLabel}>Total Users</Text>
        </SpiritualCard>

        <SpiritualCard style={styles.statCard}>
          <Play size={24} color={Colors.softGold} />
          <Text style={styles.statNumber}>{adminStats.totalSermons}</Text>
          <Text style={styles.statLabel}>Sermons</Text>
        </SpiritualCard>

        <SpiritualCard style={styles.statCard}>
          <FileText size={24} color={Colors.softGold} />
          <Text style={styles.statNumber}>{adminStats.totalDoctrines}</Text>
          <Text style={styles.statLabel}>Doctrines</Text>
        </SpiritualCard>

        <SpiritualCard style={styles.statCard}>
          <Upload size={24} color={Colors.softGold} />
          <Text style={styles.statNumber}>{adminStats.thisWeekUploads}</Text>
          <Text style={styles.statLabel}>This Week</Text>
        </SpiritualCard>
      </View>

      {/* Recent Activity */}
      <SpiritualCard style={styles.activityCard}>
        <Text style={styles.activityTitle}>Recent Uploads</Text>
        {recentUploads.map((upload) => (
          <View key={upload.id} style={styles.activityItem}>
            <View style={styles.activityInfo}>
              <Text style={styles.activityItemTitle}>{upload.title}</Text>
              <Text style={styles.activityItemMeta}>
                {upload.type} • {upload.date}
              </Text>
            </View>
            <View style={[
              styles.statusBadge,
              { backgroundColor: upload.status === 'published' ? Colors.success : Colors.warning }
            ]}>
              <Text style={styles.statusText}>{upload.status}</Text>
            </View>
          </View>
        ))}
      </SpiritualCard>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.quickActionButton}>
          <Settings size={20} color={Colors.softGold} />
          <Text style={styles.quickActionText}>Settings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.quickActionButton}>
          <BarChart size={20} color={Colors.softGold} />
          <Text style={styles.quickActionText}>Analytics</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.quickActionButton}>
          <Users size={20} color={Colors.softGold} />
          <Text style={styles.quickActionText}>Manage Users</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
            <Text style={styles.title}>Admin Panel</Text>
            <Text style={styles.subtitle}>Manage church content and users</Text>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 'overview' && styles.activeTab]}
            onPress={() => setSelectedTab('overview')}
          >
            <Text style={[styles.tabText, selectedTab === 'overview' && styles.activeTabText]}>
              Overview
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 'upload' && styles.activeTab]}
            onPress={() => setSelectedTab('upload')}
          >
            <Text style={[styles.tabText, selectedTab === 'upload' && styles.activeTabText]}>
              Upload Content
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content Based on Selected Tab */}
        {selectedTab === 'overview' ? renderOverviewSection() : renderUploadSection()}

        {/* Pending Reviews Alert */}
        <SpiritualCard style={styles.alertCard}>
          <View style={styles.alertHeader}>
            <Calendar size={20} color={Colors.warning} />
            <Text style={styles.alertTitle}>Pending Reviews</Text>
          </View>
          <Text style={styles.alertText}>
            You have {adminStats.pendingReviews} items waiting for review and approval.
          </Text>
          <TouchableOpacity style={styles.alertButton}>
            <Text style={styles.alertButtonText}>Review Now</Text>
          </TouchableOpacity>
        </SpiritualCard>
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
    fontFamily: 'Crimson-SemiBold',
    fontSize: 24,
    color: Colors.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.secondary,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.warmWhite,
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: Colors.softGold,
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.secondary,
  },
  activeTabText: {
    color: Colors.warmWhite,
  },
  overviewSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: Colors.primary,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 24,
  },
  statNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: Colors.primary,
    marginVertical: 8,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.secondary,
    textAlign: 'center',
  },
  activityCard: {
    marginBottom: 24,
  },
  activityTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.primary,
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGold,
  },
  activityInfo: {
    flex: 1,
  },
  activityItemTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary,
    marginBottom: 2,
  },
  activityItemMeta: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.muted,
  },
  statusBadge: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: Colors.warmWhite,
    textTransform: 'uppercase',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    backgroundColor: Colors.warmWhite,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 0.3,
    borderWidth: 1,
    borderColor: Colors.lightGold,
  },
  quickActionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.primary,
    marginTop: 8,
    textAlign: 'center',
  },
  uploadSection: {
    marginBottom: 24,
  },
  uploadGrid: {
    marginBottom: 24,
  },
  uploadCard: {
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 24,
  },
  uploadTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.primary,
    marginTop: 12,
    marginBottom: 8,
  },
  uploadDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.secondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  uploadButton: {
    backgroundColor: Colors.lightGold,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  uploadButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.primary,
  },
  quickUploadCard: {
    marginBottom: 24,
  },
  quickUploadTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.primary,
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary,
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: Colors.softGray,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.primary,
    borderWidth: 1,
    borderColor: Colors.lightGold,
  },
  categoryButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryButton: {
    backgroundColor: Colors.lightGold,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  categoryButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.primary,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.softGold,
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 8,
  },
  submitButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.warmWhite,
    marginLeft: 8,
  },
  alertCard: {
    backgroundColor: '#FEF3C7',
    borderColor: Colors.warning,
    marginBottom: 20,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  alertTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.primary,
    marginLeft: 8,
  },
  alertText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.secondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  alertButton: {
    backgroundColor: Colors.warning,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  alertButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: Colors.warmWhite,
  },
});