using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Study_Buddy.Models;

namespace Study_Buddy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        StudyBuddyDbContext dbcontext = new StudyBuddyDbContext();

        [HttpGet("getQuestions")]
        public List<QandA> getQuestions()
        {
            return dbcontext.QandAs.ToList();
        }

        [HttpPost("addFavorite")]
        public Favorite addFavorite(int questionId, int userid)
        {
            Favorite newFavorite = new Favorite() { 
            Questionid = questionId,
            Userid = userid
            };  
            dbcontext.Favorites.Add(newFavorite);
            dbcontext.SaveChanges();   
            return newFavorite;
        }

        [HttpDelete("deleteFavorite")]
        public void deleteFavorite(int questionId, int userId)
        {
            Favorite F = dbcontext.Favorites.FirstOrDefault(q => q.Questionid == questionId && q.Userid == userId);
            dbcontext.Favorites.Remove(F);
            dbcontext.SaveChanges();
        }

        [HttpPost("addQuestion")]
        public QandA addQuestion(string question, string answer)
        {
            QandA newQuestion = new QandA()
            {
                Question = question,
                Answer = answer
            };
            dbcontext.Add(newQuestion);
            dbcontext.SaveChanges();
            return newQuestion;
        }

        [HttpDelete("deleteQuestion")]
        public void deleteQuestion(int questionId)
        {
            
            QandA Q = dbcontext.QandAs.FirstOrDefault(a => a.Questionid == questionId);
            List <Favorite> favs = dbcontext.Favorites.Where(f => f.Questionid == questionId).ToList();
            foreach(Favorite F in favs)
            {
                dbcontext.Favorites.Remove(F);
            }        
            
            dbcontext.QandAs.Remove(Q);
            dbcontext.SaveChanges();

        }

        [HttpGet("getFavorites")]
        public List<QandA> getFavorites(int userId)
        {
            List<Favorite> favList = new List<Favorite>();
            favList = dbcontext.Favorites.Where(f => f.Userid == userId).ToList();
            bool idExist = favList.Any();
            List<QandA> newQs = new List<QandA>();
            foreach (Favorite f in favList)
            {
                newQs.Add(dbcontext.QandAs.FirstOrDefault(q => q.Questionid == f.Questionid));
            }
            return newQs;
        }
    }
}
