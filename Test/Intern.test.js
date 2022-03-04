const index = require("../index.js")
test("Create fake manager with properties",()=>{
    var NewEmp= new index.Intern("Mr Intern", 852412,"Intern@gmail.com","Oak Park")
    expect(NewEmp.getEmail()).toBe("Intern@gmail.com")
    expect(NewEmp.getName()).toBe("Mr Intern")
    expect(NewEmp.getRole()).toBe("Intern")
    expect(NewEmp.getId()).toBe(852412)
    expect(NewEmp.getSchool()).toBe("Oak Park")
})