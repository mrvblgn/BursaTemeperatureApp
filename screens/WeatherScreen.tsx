import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, ImageBackground, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getWeatherData, WeatherData } from '../services/weatherService';

const { width } = Dimensions.get('window');

interface WeatherScreenProps {
  backgroundImage: any;
}

const WeatherScreen: React.FC<WeatherScreenProps> = ({ backgroundImage }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWeatherData();
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Beklenmeyen bir hata oluştu');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
    // 5 dakikada bir hava durumu verilerini güncelle
    const interval = setInterval(fetchWeatherData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchWeatherData();
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          {/* Yenile butonu */}
          <TouchableOpacity style={styles.refreshButton} onPress={fetchWeatherData} disabled={loading}>
            <Text style={styles.refreshButtonText}>{loading ? 'Yenileniyor...' : 'Yenile'}</Text>
          </TouchableOpacity>
          <Text style={styles.cityName}>Bursa</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity style={styles.retryButton} onPress={fetchWeatherData}>
                <Text style={styles.retryButtonText}>Tekrar Dene</Text>
              </TouchableOpacity>
            </View>
          ) : weatherData ? (
            <View style={styles.weatherContainer}>
              <Text style={styles.temperature}>{Math.round(weatherData.temperature)}°C</Text>
              <Text style={styles.description}>{weatherData.description}</Text>
              <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Nem</Text>
                  <Text style={styles.detailValue}>{weatherData.humidity}%</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Rüzgar</Text>
                  <Text style={styles.detailValue}>{weatherData.windSpeed} m/s</Text>
                </View>
              </View>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: width * 0.05,
  },
  refreshButton: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 5,
  },
  refreshButtonText: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cityName: {
    fontSize: width > 400 ? 44 : 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    textAlign: 'center',
  },
  weatherContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: width * 0.06,
    borderRadius: 15,
    width: '100%',
    maxWidth: 400,
  },
  temperature: {
    fontSize: width > 400 ? 72 : 48,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: width > 400 ? 24 : 18,
    color: '#fff',
    marginTop: 10,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.3)',
  },
  detailItem: {
    alignItems: 'center',
    minWidth: 80,
  },
  detailLabel: {
    fontSize: width > 400 ? 16 : 13,
    color: '#fff',
    opacity: 0.8,
  },
  detailValue: {
    fontSize: width > 400 ? 20 : 16,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 5,
  },
  errorContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: width * 0.06,
    borderRadius: 15,
    width: '100%',
    maxWidth: 400,
  },
  errorText: {
    color: '#fff',
    fontSize: width > 400 ? 18 : 15,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WeatherScreen; 