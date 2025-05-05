import { useEffect, useState } from "react";

export const usePermission = (permission) => {
    const [hasPermission, setHasPermission] = useState(false);

    useEffect(() => {
        try {
            const rawPermissions = localStorage.getItem('permissions');
            const storedPermissions = rawPermissions ? JSON.parse(rawPermissions) : [];
            setHasPermission(storedPermissions.includes(permission));
        } catch (error) {
            console.error("Lỗi khi đọc quyền từ localStorage:", error);
            setHasPermission(false); 
        }
    }, [permission]);

    return hasPermission;
};
