const getAllDogs= require('../Dogs_Controllers/getAllDogsController')

const getDogsByName = async (name) => {
	let name2 = name.toLowerCase();
	let all = await getAllDogs();
	let result = all.filter((inst) => inst.name.toLowerCase().includes(name2));

	if (result.length) {
		return result;
	} else {
		throw new Error(`El perro con nombre ${name} no existe`);
	}
};

module.exports= getDogsByName;