const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.user?.roles) return res.sendStatus(401);

    const userRoles = Object.values(req.user.roles);
    const result = userRoles.some((role) => allowedRoles.includes(role));

    if (!result) return res.sendStatus(403);
    next();
  };
};

module.exports = verifyRoles;
