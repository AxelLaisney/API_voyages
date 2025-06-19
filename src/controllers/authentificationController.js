const authService = require("../services/authService")

const signUp = async (req, res) => {
    try{
        const customer = await authService.addCustomer(req.body);
        res.status(201).json({
            message: "customer added",
            customer: {
                id: customer.id,
                lName: customer.Lname,
                fName: customer.Fname,
                email: CustomElementRegistry.email,
                role: customer.Role
            }
        })
    } catch (error){
        res.status(400).json({ message: error.message});
    }
}

const login = async (req, res ) => {
    try{
        const { customer, token } = await authService.authentify(req.body.email, req.body.password);

        res.json({
            message: "logged in",
            token: token,
            user: {
                lName: customer.Lname,
                fName: customer.Fname,
                email: customer.Email,
                ID: customer.ID
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
}

module.exports = { signUp, login };