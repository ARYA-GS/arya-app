

export const minimalMapStyle = [
    {
        elementType: 'geometry',
        stylers: [{ color: '#e0e0e0' }],  //
    },
    {
        elementType: 'labels.text.fill',
        stylers: [{ color: '#616161' }],
    },
    {
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#f5f5f5' }],
    },
    {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#bdbdbd' }],
    },
    {
        featureType: 'poi',
        stylers: [{ visibility: 'off' }],
    },
    {
        featureType: 'road',
        stylers: [
            { visibility: 'simplified' },
            { color: '#ffffff' },
        ],
    },
    {
        featureType: 'transit',
        stylers: [{ visibility: 'off' }],
    },
    {
        featureType: 'water',
        stylers: [{ color: '#cfd8dc' }],
    },
];
