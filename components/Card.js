import React, { useState, useRef } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Modal, Dimensions, Text, Animated } from 'react-native';

const Card = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [cardScratched, setCardScratched] = useState(false);
  const [maskOpacities, setMaskOpacities] = useState(Array(6).fill(1));
  const animation = useRef(new Animated.Value(0)).current;

  const handleScratch = (index) => {
    if (!cardScratched) {
      setActiveIndex(index);
      setCardScratched(true);
    }
  };

  const translateY = animation.interpolate({
    inputRange: [0, 0.1],
    outputRange: [30, 0],
  });

  const scratchImages = [
    { foreground: require('./assets/scratch_foreground.png'), background: require('./assets/scratch_background.png') },

  ];

  return (
    <View style={styles.back}>
      <View style={styles.container}>
        {scratchImages.map((image, index) => (
          <TouchableOpacity key={index} onPress={() => handleScratch(index)} style={styles.maskedImage}>
            <Image source={image.foreground} style={[styles.image, { opacity: maskOpacities[index] }]} />
            <Image source={image.background} style={[styles.mask, { opacity: 1 - maskOpacities[index] }]} />
            {activeIndex === index && (
              <Modal visible={true} transparent={true} onRequestClose={() => setActiveIndex(null)}>
                <View style={styles.modalContainer}>
                  <View style={styles.blackBackground}></View>
                  <Animated.View style={[styles.modalContent, { transform: [{ translateY }] }]}>
                    <Image source={scratchImages[activeIndex].background} style={styles.fullscreenImage} resizeMode="contain" />
                    <TouchableOpacity style={styles.closeButton} onPress={() => setActiveIndex(null)}>
                      <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                    <Text style={styles.win}>You Win !</Text>
                  </Animated.View>
                </View>
              </Modal>
            )}
          </TouchableOpacity>
        ))}
      </View>
     
        {/* <Text style={styles.scratch}>Click to Reveal !</Text> */}
      
    </View>
  );
};

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 210,
  },
  back: {
    backgroundColor: '#295194',
    width: '100%',
    height: '100%',
  },
  maskedImage: {
    width: 200,
    height: 200,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 20,
    margin: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 20,
  },
  mask: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    position: 'relative',
    width: '80%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'gray',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  blackBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
  },
  win: {
    fontSize: 30,
    marginLeft: 10,
    marginBottom: 120,
    color: 'white',
    fontWeight: 'bold',
  },
  scratch: {
    fontSize: 30,
    marginLeft: 80,
    position: 'absolute',
    top: 40,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Card;