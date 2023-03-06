using System;
using System.Collections.Generic;

namespace Study_Buddy.Models;

public partial class QandA
{
    public int Questionid { get; set; }

    public string? Question { get; set; }

    public string? Answer { get; set; }

    public virtual ICollection<Favorite> Favorites { get; } = new List<Favorite>();
}
