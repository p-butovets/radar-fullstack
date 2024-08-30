import { useState } from 'react';
import axios from 'axios';

const useCourierLocation = (courierId) => {
    const [locationData, setLocationData] = useState(null);
    const [loadingg, setLoadingg] = useState(true);
    const [error, setError] = useState(null);

    const fetchCourierLocation = async (courierId) => {
        const formData = new FormData();
        formData.append("token", "Hxyw5wBZ2K1DVzGKiRx24mUz0VvEykUtgckzZrDlXZgHTxSUm92ZpqArKiziMrhz");
        formData.append("by", "external_id");
        formData.append("type", "last");
        formData.append("external_id", courierId);

        try {
            const response = await axios.post('https://dp.bl.kiev.ua/api/json/employee-courier-get-location', formData, {});

            // Возвращаем данные, чтобы можно было их использовать
            return response.data;
        } catch (err) {
            // Логируем ошибку и возвращаем ее для обработки
            console.error('Error fetching courier location:', err);
            throw err; // бросаем ошибку, чтобы она могла быть поймана в .catch
        }
    };

    return { locationData, fetchCourierLocation, loadingg, error };
};

export default useCourierLocation;