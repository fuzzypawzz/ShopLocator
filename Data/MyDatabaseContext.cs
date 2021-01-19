using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ShopLocator.Models;

namespace ShopLocator.Models
{
    public class MyDatabaseContext : DbContext
    {
        public MyDatabaseContext (DbContextOptions<MyDatabaseContext> options)
            : base(options)
        {
        }

        public DbSet<ShopLocator.Models.Todo> Todo { get; set; }

        public DbSet<ShopLocator.Models.Store> Store { get; set; }
    }
}
