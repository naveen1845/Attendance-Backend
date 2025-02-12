export default function crudRepository(model) {
    return {
      create: async function (data) {
        const response = await model.create(data);
        return response;
      },
      update: async function (id, data) {
        const response = await model.findByIdAndUpdate(id, data, { new: true });
        return response;
      },
      getAll: async function () {
        const allDocs = await model.find();
        return allDocs;
      },
      getById: async function (id) {
        const doc = await model.findById(id);
        return doc;
      },
      delete: async function (id) {
        const response = await model.findByIdAndDelete(id);
        return response;
      },
      deleteMany: async function (modelIds) {
        const response = await model.deleteMany({
          _id: {
            $in: modelIds
          }
        });
        return response;
      }
    };
  }
  