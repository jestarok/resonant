
const pictureType= new graphql.GraphQLObjectType({
  name : 'picture',
  description : 'this is picture info',
  fields : function(){
    return {
      id :{
        type : graphql.GraphQLInt,
        resolve(picture){
          return picture.id;
        }
      },
      name :{
        type : graphql.GraphQLString,
        resolve(picture){
          return picture.fileName;
        }
      },

      // posts:{
      //   args: {
      //   id:{
      //       type : graphql.GraphQLInt,
      //   },
      //   type: new  graphql.GraphQLList(posts),
      //   resolve(user, args){
      //     // Code here to use args.id
      //     return user.getPosts();
      //   }
      // }


    }
  }
});

export const schemas ={
  id= "appzeUDpZOqRjLPaJ",
  tables= [
    {
      name= "Furniture",
      columns= [
        {
          name = "name",
          type= [string],
          options= {}
        },
        {
          name= "Orders",
          type= "foreignKey",
          options= {
            relationship= "many",
            table= "Order Line Items"
          }
        },
        {
          name= "Picture",
          type= pictureType,
          options= {}
        },
        {
          name= "Description",
          type= "multilineText",
          options= {}
        },
        {
          name= "Link",
          type= "text",
          options= {}
        },
        {
          name= "type",
          type= "select",
          options= {
            choices= [
              "Lighting",
              "Chairs",
              "tables",
              "Bookshelves",
              "Rugs",
              "Sofas",
              "Beds",
              "testing"
            ]
          }
        },
        {
          name= "Unit Cost",
          type= "number",
          options= {
            format= "currency"
          }
        },
        {
          name= "Materials and Finishes",
          type= "multiSelect",
          options= {
            choices= [
              "Rough",
              "Dark Wood",
              "Light Wood",
              "Red",
              "Orange",
              "Yellow",
              "Green",
              "Blue Purple",
              "Leather",
              "Velvet",
              "Corduroy",
              "Stainless Steel",
              "Brushed Nickel",
              "Steel",
              "Iron",
              "Reclaimed Wood",
              "Marble",
              "Glass",
              "Mirror",
              "Gold",
              "Silver",
              "Brown",
              "Black",
              "White",
              "Lacquered Ash",
              "Glazed Ceramic Base, Linen Shade",
              "Indian Wool",
              "Matte Black",
              "Shiny Black",
              "Wool",
              "Viscose",
              "Grey",
              "Foam Beans",
              "Cotton",
              "Tech Suede",
              "Framboise",
              "Fern",
              "Dove",
              "Taupe",
              "Suede",
              "Brass",
              "Walnut",
              "Leather Cowhide",
              "Glazed Ceramic",
              "Poly-cotton Shade",
              "Solid Teak",
              "Solid Maple",
              "White Ash",
              "Cherry",
              "Cream",
              "Metal"
            ]
          }
        },
        {
          name= "Settings",
          type= "multiSelect",
          options= {
            choices= ["Living Room", "Office", "Outdoor", "Dining", "Bedroom"]
          }
        },
        {
          name= "Size (WxLxH)",
          type= "text",
          options= {}
        },
        {
          name= "Notes",
          type= "multilineText",
          options= {}
        },
        {
          name= "Schematic",
          type= "multipleAttachment",
          options= {}
        },
        {
          name= "Vendor",
          type= "foreignKey",
          options= {
            relationship= "many",
            table= "Vendors"
          }
        },
        {
          name= "Designer",
          type= "foreignKey",
          options= {
            relationship= "many",
            table= "Designers"
          }
        },
        {
          name= "In Stock",
          type= "checkbox",
          options= {}
        },
        {
          name= "Total Units Sold",
          type= "rollup",
          options= {}
        },
        {
          name= "Gross Sales",
          type= "rollup",
          options= {}
        },
        {
          name= "Units In Store",
          type= "number",
          options= {
            format= "integer"
          }
        },
        {
          name= "RecordID",
          type= "formula",
          options= {}
        }
      ]
    },
    {
      name= "Vendors",
      columns= [
        {
          name= "name",
          type= "text",
          options= {}
        },
        {
          name= "Furniture",
          type= "foreignKey",
          options= {
            relationship= "many",
            table= "Furniture"
          }
        },
        {
          name= "Notes",
          type= "multilineText",
          options= {}
        },
        {
          name= "Logo",
          type= "multipleAttachment",
          options= {}
        },
        {
          name= "Sales Contact",
          type= "foreignKey",
          options= {
            relationship= "many",
            table= "Vendor Contacts"
          }
        },
        {
          name= "Vendor Phone Number",
          type= "phone",
          options= {}
        },
        {
          name= "Closest Showroom Address",
          type= "multilineText",
          options= {}
        },
        {
          name= "Catalog Link",
          type= "text",
          options= {}
        },
        {
          name= "Shipping Details",
          type= "multipleAttachment",
          options= {}
        }
      ]
    },
    {
      name= "Clients",
      columns= [
        {
          name= "name",
          type= "text",
          options= {}
        },
        {
          name= "Notes",
          type= "multilineText",
          options= {}
        },
        {
          name= "Photos of Client Space",
          type= "multipleAttachment",
          options= {}
        },
        {
          name= "Client Orders",
          type= "foreignKey",
          options= {
            relationship= "many",
            table= "Client Orders"
          }
        },
        {
          name= "Billing Address",
          type= "multilineText",
          options= {}
        },
        {
          name= "Map Cache",
          type= "text",
          options= {}
        },
        {
          name= "Users",
          type= "text",
          options= {}
        }
      ]
    },
    {
      name= "Users",
      columns= [
        {
          name= "key",
          type= "formula",
          options= {}
        },
        {
          name= "Password",
          type= "text",
          options= {}
        },
        {
          name= "First name",
          type= "text",
          options= {}
        },
        {
          name= "Last name",
          type= "text",
          options= {}
        },
        {
          name= "email",
          type= "text",
          options= {}
        },
        {
          name= "username",
          type= "text",
          options= {}
        }
      ]
    },
    {
      name= "Client Orders",
      columns= [
        {
          name= "name",
          type= "formula",
          options= {}
        },
        {
          name= "Client",
          type= "foreignKey",
          options= {
            relationship= "one",
            table= "Clients"
          }
        },
        {
          name= "Order Line Items",
          type= "foreignKey",
          options= {
            relationship= "many",
            table= "Order Line Items"
          }
        },
        {
          name= "Fulfill By",
          type= "date",
          options= {}
        },
        {
          name= "Invoice",
          type= "multipleAttachment",
          options= {}
        },
        {
          name= "Order Number",
          type= "text",
          options= {}
        },
        {
          name= "Status",
          type= "select",
          options= {
            choices= ["Invoiced", "Shipped", "Received"]
          }
        },
        {
          name= "Order Total Cost",
          type= "rollup",
          options= {}
        },
        {
          name= "Bill to",
          type= "lookup",
          options= {}
        },
        {
          name= "clientId",
          type= "text",
          options= {}
        },
        {
          name= "userEmail",
          type= "text",
          options= {}
        }
      ]
    },
    {
      name= "Order Line Items",
      columns= [
        {
          name="name",
          type= "formula",
          options= {}
        },
        {
          name= "Quantity",
          type= "number",
          options= {
            format= "integer"
          }
        },
        {
          name= "Furniture Item",
          type= "foreignKey",
          options= {
            relationship= "one",
            table= "Furniture"
          }
        },
        {
          name= "Price",
          type= "lookup",
          options= {}
        },
        {
          name= "Total Cost ($)",
          type= "formula",
          options= {}
        },
        {
          name= "Belongs to Order",
          type= "foreignKey",
          options= {
            relationship= "many",
            table= "Client Orders"
          }
        }
      ]
    },
    {
      name= "Designers",
      columns= [
        {
          name="name",
          type= "text",
          options= {}
        },
        {
          name= "Furniture",
          type= "foreignKey",
          options= {
            relationship= "many",
            table= "Furniture"
          }
        },
        {
          name= "Background",
          type= "multilineText",
          options= {}
        }
      ]
    },
    {
      name= "Vendor Contacts",
      columns= [
        {
          name="name",
          type= "text",
          options= {}
        },
        {
          name= "Vendors",
          type= "foreignKey",
          options= {
            relationship= "many",
            table= "Vendors"
          }
        },
        {
          name= "Photo",
          type= "multipleAttachment",
          options= {}
        },
        {
          name= "Phone Number",
          type= "phone",
          options= {}
        },
        {
          name= "Email",
          type= "text",
          options= {}
        }
      ]
    }
  ]
}
