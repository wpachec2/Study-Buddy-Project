using System;
using System.Collections.Generic;

namespace Study_Buddy.Models;

public partial class Favorite
{
    public int Favoriteid { get; set; }

    public int Questionid { get; set; }

    public int Userid { get; set; }

    public virtual QandA? Question { get; set; }
}
