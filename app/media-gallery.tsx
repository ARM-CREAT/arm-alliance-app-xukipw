
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Dimensions,
  Image,
  Modal,
  Platform,
} from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { useContent, MediaItem } from '@/contexts/ContentContext';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function MediaGalleryScreen() {
  const { media } = useContent();
  const params = useLocalSearchParams();
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const videoRef = useRef<Video>(null);

  const filteredMedia = filter === 'all' 
    ? media 
    : media.filter(item => item.type === filter);

  const openMedia = (item: MediaItem) => {
    console.log('Opening media:', item.title);
    setSelectedMedia(item);
  };

  const closeMedia = () => {
    console.log('Closing media viewer');
    if (videoRef.current) {
      videoRef.current.pauseAsync();
    }
    setSelectedMedia(null);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Galerie Média',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{ marginLeft: 8 }}>
              <IconSymbol name="chevron.left" size={24} color={colors.white} />
            </Pressable>
          ),
        }}
      />
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
        <View style={styles.container}>
          {/* Filter Tabs */}
          <View style={styles.filterContainer}>
            <Pressable
              style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
              onPress={() => setFilter('all')}
            >
              <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
                Tout ({media.length})
              </Text>
            </Pressable>
            <Pressable
              style={[styles.filterButton, filter === 'image' && styles.filterButtonActive]}
              onPress={() => setFilter('image')}
            >
              <IconSymbol 
                name="photo" 
                size={18} 
                color={filter === 'image' ? colors.white : colors.text} 
              />
              <Text style={[styles.filterText, filter === 'image' && styles.filterTextActive]}>
                Photos ({media.filter(m => m.type === 'image').length})
              </Text>
            </Pressable>
            <Pressable
              style={[styles.filterButton, filter === 'video' && styles.filterButtonActive]}
              onPress={() => setFilter('video')}
            >
              <IconSymbol 
                name="video" 
                size={18} 
                color={filter === 'video' ? colors.white : colors.text} 
              />
              <Text style={[styles.filterText, filter === 'video' && styles.filterTextActive]}>
                Vidéos ({media.filter(m => m.type === 'video').length})
              </Text>
            </Pressable>
          </View>

          {/* Media Grid */}
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
            {filteredMedia.length === 0 ? (
              <View style={styles.emptyState}>
                <IconSymbol name="photo.on.rectangle" size={64} color={colors.textSecondary} />
                <Text style={styles.emptyText}>Aucun média disponible</Text>
                <Text style={styles.emptySubtext}>
                  Les photos et vidéos ajoutées par l&apos;administrateur apparaîtront ici
                </Text>
              </View>
            ) : (
              <View style={styles.mediaGrid}>
                {filteredMedia.map((item) => (
                  <Pressable
                    key={item.id}
                    style={styles.mediaItem}
                    onPress={() => openMedia(item)}
                  >
                    {item.type === 'image' ? (
                      <Image
                        source={{ uri: item.url }}
                        style={styles.mediaImage}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={styles.videoThumbnail}>
                        <Image
                          source={{ uri: item.url }}
                          style={styles.mediaImage}
                          resizeMode="cover"
                        />
                        <View style={styles.playIconOverlay}>
                          <IconSymbol name="play.circle.fill" size={56} color={colors.white} />
                        </View>
                        <View style={styles.videoBadge}>
                          <IconSymbol name="video.fill" size={14} color={colors.white} />
                        </View>
                      </View>
                    )}
                    <View style={styles.mediaInfo}>
                      <Text style={styles.mediaTitle} numberOfLines={2}>
                        {item.title}
                      </Text>
                      {item.description && (
                        <Text style={styles.mediaDescription} numberOfLines={2}>
                          {item.description}
                        </Text>
                      )}
                      <Text style={styles.mediaDate}>{item.date}</Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            )}
          </ScrollView>
        </View>

        {/* Media Viewer Modal */}
        <Modal
          visible={selectedMedia !== null}
          transparent={true}
          animationType="fade"
          onRequestClose={closeMedia}
        >
          <View style={styles.modalContainer}>
            <Pressable style={styles.modalBackdrop} onPress={closeMedia} />
            {selectedMedia && (
              <Animated.View 
                entering={FadeIn.duration(200)} 
                exiting={FadeOut.duration(200)}
                style={styles.modalContent}
              >
                <View style={styles.modalHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.modalTitle}>{selectedMedia.title}</Text>
                    {selectedMedia.description && (
                      <Text style={styles.modalDescription}>{selectedMedia.description}</Text>
                    )}
                  </View>
                  <Pressable onPress={closeMedia} style={styles.closeButton}>
                    <IconSymbol name="xmark.circle.fill" size={32} color={colors.white} />
                  </Pressable>
                </View>

                <View style={styles.mediaViewer}>
                  {selectedMedia.type === 'image' ? (
                    <Image
                      source={{ uri: selectedMedia.url }}
                      style={styles.fullImage}
                      resizeMode="contain"
                    />
                  ) : (
                    <Video
                      ref={videoRef}
                      source={{ uri: selectedMedia.url }}
                      style={styles.fullVideo}
                      useNativeControls
                      resizeMode={ResizeMode.CONTAIN}
                      shouldPlay={false}
                      onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
                        if (status.isLoaded) {
                          console.log('Video playback status:', status);
                        }
                      }}
                    />
                  )}
                </View>

                <View style={styles.modalFooter}>
                  <Text style={styles.modalDate}>{selectedMedia.date}</Text>
                </View>
              </Animated.View>
            )}
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: colors.card,
    gap: 6,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  filterTextActive: {
    color: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
  mediaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  mediaItem: {
    width: (width - 44) / 2,
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 4,
  },
  mediaImage: {
    width: '100%',
    height: 160,
    backgroundColor: colors.card,
  },
  videoThumbnail: {
    position: 'relative',
  },
  playIconOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  videoBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    padding: 6,
  },
  mediaInfo: {
    padding: 12,
  },
  mediaTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  mediaDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
    lineHeight: 16,
  },
  mediaDate: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    gap: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  modalDescription: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.8,
    lineHeight: 20,
  },
  closeButton: {
    padding: 4,
  },
  mediaViewer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: width,
    height: height * 0.7,
  },
  fullVideo: {
    width: width,
    height: height * 0.7,
  },
  modalFooter: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    alignItems: 'center',
  },
  modalDate: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.7,
  },
});
