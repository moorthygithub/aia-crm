export const checkPermission = (userId, button, permissions) => {

    const permission = permissions.find(p => p.button === button);
    if (!permission) return false;
    return permission.userIds.includes(userId) && permission.status === 'Active';
  };

  

  // export const checkPermission = 1,VechilesCreate,

  