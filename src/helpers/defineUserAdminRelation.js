export const defineUserAdminRelation = (model, Usuarios) => {
    model.belongsTo(Usuarios, { foreignKey: "adminId", as: "adminCriador" });
    Usuarios.hasMany(model, { foreignKey: "adminId", as: "usuariosCriados" });
};
