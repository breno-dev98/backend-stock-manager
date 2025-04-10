export const defineUserRelation = (model, Usuarios) => {
    model.belongsTo(Usuarios, { foreignKey: "user_id" });
    Usuarios.hasMany(model, { foreignKey: "user_id" });
};
