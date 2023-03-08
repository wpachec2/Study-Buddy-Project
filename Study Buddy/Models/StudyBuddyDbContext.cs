using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Study_Buddy.Models;

public partial class StudyBuddyDbContext : DbContext
{
    public StudyBuddyDbContext()
    {
    }

    public StudyBuddyDbContext(DbContextOptions<StudyBuddyDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Favorite> Favorites { get; set; }

    public virtual DbSet<QandA> QandAs { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
/*WINDOWS*/        => optionsBuilder.UseSqlServer("Data Source=.\\sqlexpress01;Initial Catalog=StudyBuddyDB; Integrated Security=SSPI;Encrypt=false;TrustServerCertificate=True;");
    /*MAC*/        //=> optionsBuilder.UseSqlServer("Server=localhost,1433; Initial Catalog=StudyBuddyDB; User ID=SA; Password=EnterPasswordHere1; TrustServerCertificate=true;");
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Favorite>(entity =>
        {
            entity.HasKey(e => e.Favoriteid).HasName("PK__Favorite__87770BCD72D4D375");

            entity.ToTable("Favorite");

            entity.Property(e => e.Favoriteid).HasColumnName("favoriteid");
            entity.Property(e => e.Questionid).HasColumnName("questionid");
            entity.Property(e => e.Userid).HasColumnName("userid");

            entity.HasOne(d => d.Question).WithMany(p => p.Favorites)
                .HasForeignKey(d => d.Questionid)
                .HasConstraintName("FK__Favorite__questi__4BAC3F29");
        });

        modelBuilder.Entity<QandA>(entity =>
        {
            entity.HasKey(e => e.Questionid).HasName("PK__QandA__62C2216A1ED80CFF");

            entity.ToTable("QandA");

            entity.Property(e => e.Questionid).HasColumnName("questionid");
            entity.Property(e => e.Answer)
                .HasMaxLength(1000)
                .HasColumnName("answer");
            entity.Property(e => e.Question)
                .HasMaxLength(1000)
                .HasColumnName("question");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
