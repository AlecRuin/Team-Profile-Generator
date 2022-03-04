const index = require("../index.js")
test("Create fake manager with properties",()=>{
    var NewEmp= new index.Manager("Mr Manager", 85453186,"Manager@gmail.com",5483218)
    expect(NewEmp.getEmail()).toBe("Manager@gmail.com")
    expect(NewEmp.getName()).toBe("Mr Manager")
    expect(NewEmp.getRole()).toBe("Manager")
    expect(NewEmp.getId()).toBe(85453186)
})